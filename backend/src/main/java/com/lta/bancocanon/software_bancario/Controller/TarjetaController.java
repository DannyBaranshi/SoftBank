package com.lta.bancocanon.software_bancario.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lta.bancocanon.software_bancario.Tarjeta.TarjetaDTO;
import com.lta.bancocanon.software_bancario.Tarjeta.TarjetaRepository;
import com.lta.bancocanon.software_bancario.Usuario.Usuario;
import com.lta.bancocanon.software_bancario.Controller.PaymentRequest;
import com.lta.bancocanon.software_bancario.Controller.PaymentReceipt;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/tarjetas")
public class TarjetaController {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private CuentaService cuentaService;

    /**
     * Devuelve las tarjetas asociadas al usuario autenticado (a través del servicio de cuentas que obtiene usuario).
     */
    @GetMapping
    public ResponseEntity<List<TarjetaDTO>> listarMisTarjetas(){
        // obtener usuario autenticado
        Usuario usuario = cuentaService.obtenerNomUsuarioAutent();
        List<TarjetaDTO> tarjetas = tarjetaRepository.findByCuentaUsuario(usuario);
        return ResponseEntity.ok(tarjetas);
    }

    @PostMapping("/pagos")
    public ResponseEntity<PaymentReceipt> pagarTarjeta(@RequestBody PaymentRequest request){
        try {
            PaymentReceipt receipt = cuentaService.pagarTarjeta(request);
            return ResponseEntity.ok(receipt);
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Servicio no disponible");
        }
    }
}
