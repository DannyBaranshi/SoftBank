package com.lta.bancocanon.software_bancario.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.lta.bancocanon.software_bancario.Cuentas.CuentaDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.lta.bancocanon.software_bancario.Controller.SaldoResponse;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;
import com.lta.bancocanon.software_bancario.Cuentas.TipoCuenta;

@RestController
@RequestMapping("/cuentas")
@RequiredArgsConstructor
public class CuentaController {
    
    @Autowired
    private CuentaService cuentaService;

/*
 * EXPOSICION DEL ENDPOINT PARA CREAR CUENTA DE AHORROS
 */
    @PostMapping("/ahorros")
    public ResponseEntity<CuentaDTO> crearCuentaAhorros(@Valid @RequestBody CuentaAhorrosRequest cuentaAhorrosRequest){
        CuentaDTO cuentaCreada = cuentaService.crearCuentaAhorros(cuentaAhorrosRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(cuentaCreada);
    }
/*
 * EXPOSICION DEL ENDPOINT PARA CREAR CUENTA CORRIENTE
 */
    @PostMapping("/corriente")
    public ResponseEntity<CuentaDTO> crearCuentaCorriente(@Valid @RequestBody CuentaCorrienteRequest cuentaCorrienteRequest){
        CuentaDTO cuentaCreada = cuentaService.crearCuentaCorriente(cuentaCorrienteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(cuentaCreada);
    }

    /**
     * Endpoint para obtener las cuentas del usuario autenticado.
     * Query param opcional: tipo=AHORROS|CORRIENTE
     */
    @GetMapping
    public ResponseEntity<List<CuentaDTO>> listarCuentas(@RequestParam(required = false) String tipo){
        try {
            Optional<TipoCuenta> tipoEnum = Optional.empty();
            if (tipo != null && !tipo.isBlank()) {
                tipoEnum = Optional.of(TipoCuenta.valueOf(tipo.toUpperCase()));
            }
            List<CuentaDTO> cuentas = cuentaService.obtenerCuentas(tipoEnum);
            return ResponseEntity.ok(cuentas);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Endpoint para consultar el saldo de una cuenta por id.
     */
    @GetMapping("/{id}/saldo")
    public ResponseEntity<SaldoResponse> consultarSaldo(@PathVariable("id") Integer id){
        try {
            SaldoResponse saldo = cuentaService.obtenerSaldoCuenta(id);
            return ResponseEntity.ok(saldo);
        } catch (ResponseStatusException rse) {
            // Propagar el status code y mensaje
            throw rse;
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        }
    }

    @PatchMapping("/{id}/saldo")
    public ResponseEntity<Object> subirSaldo(@PathVariable("id") Integer id, @RequestBody SaldoRequest saldoRequest){
        try {
            cuentaService.recargar(id, saldoRequest.getMonto());
            return ResponseEntity.accepted().build();
        } catch (ResponseStatusException rse) {
            // Propagar el status code y mensaje
            throw rse;
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        }
    }

    /**
     * Transferencias entre cuentas. El flow soporta una primera llamada sin OTP que devuelve
     * PRECONDITION_REQUIRED (428) indicando que el cliente debe solicitar/ingresar OTP.
     * Cuando se proporciona el OTP válido, la transferencia será procesada.
     */
    @PostMapping("/transferencias")
    public ResponseEntity<TransferReceipt> transferir(@Valid @RequestBody TransferRequest transferRequest){
        try {
            TransferReceipt receipt = cuentaService.transferirCuentas(transferRequest);
            return ResponseEntity.ok(receipt);
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        }
    }

    /**
     * Devuelve todas las cuentas del sistema (para poblar destinos en el frontend).
     */
    @GetMapping("/todas")
    public ResponseEntity<List<CuentaDTO>> listarTodasCuentas(){
        List<CuentaDTO> todas = cuentaService.obtenerTodasCuentas();
        return ResponseEntity.ok(todas);
    }
}
