package com.lta.bancocanon.software_bancario.Controller;

import java.util.EnumSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.lta.bancocanon.software_bancario.Cuentas.CuentaDTO;
import com.lta.bancocanon.software_bancario.Cuentas.CuentaRepository;
import com.lta.bancocanon.software_bancario.Cuentas.TipoCuenta;
import com.lta.bancocanon.software_bancario.Tarjeta.TarjetaService;
import com.lta.bancocanon.software_bancario.Controller.SaldoResponse;
import com.lta.bancocanon.software_bancario.Usuario.Usuario;
import com.lta.bancocanon.software_bancario.Usuario.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import java.time.Instant;
import java.util.UUID;
import org.springframework.transaction.annotation.Transactional;
import com.lta.bancocanon.software_bancario.Tarjeta.TarjetaDTO;
import com.lta.bancocanon.software_bancario.Tarjeta.TarjetaRepository;


@Service
public class CuentaService {
    
    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private TarjetaService tarjetaService;
    
    @Autowired
    private TarjetaRepository tarjetaRepository;
    /*
     * Metodo para obtener el nombre de usuario, sí el usuario esta autenticado al iniciar sesion permitirá crear la cuenta.
     */
    public Usuario obtenerNomUsuarioAutent(){
   String nomUsuario = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioRepository.findByNomUsuario(nomUsuario)
          .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "USUARIO NO ENCONTRADO."));
    }

    /**
     * Realiza una transferencia entre cuentas.
     * Flujo de autenticación adicional (OTP) simulado:
     * - Si el request.otp es nulo -> se lanza PRECONDITION_REQUIRED indicando que se requiere autenticación adicional
     * - Si el otp está presente y es inválido -> UNAUTHORIZED
     * - Si es válido se realiza la transferencia (debit/credit) y se retorna un comprobante
     */
    public TransferReceipt transferirCuentas(TransferRequest request) {
        try {
            // validar existencia de cuentas
            CuentaDTO origen = cuentaRepository.findById(request.getOrigenId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta origen no encontrada"));

            CuentaDTO destino = cuentaRepository.findById(request.getDestinoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta destino no encontrada"));

            Usuario usuario = obtenerNomUsuarioAutent();

            // origen debe pertenecer al usuario autenticado
            if (!origen.getUsuario().getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permiso para operar desde la cuenta origen");
            }

            // validar monto
            if (request.getMonto() == null || request.getMonto() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monto inválido");
            }

            // Validar fondos disponibles (simple: usar saldo)
            if (origen.getSaldo() < request.getMonto()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fondos insuficientes");
            }

            // Ejecutar transferencia: débito y crédito
            origen.setSaldo(origen.getSaldo() - request.getMonto());
            destino.setSaldo(destino.getSaldo() + request.getMonto());

            cuentaRepository.save(origen);
            cuentaRepository.save(destino);

            // Generar comprobante
            TransferReceipt receipt = new TransferReceipt(UUID.randomUUID().toString(), origen.getIdCuenta(), destino.getIdCuenta(), request.getMonto(), Instant.now(), "Transferencia exitosa");
            return receipt;
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "No fue posible procesar la transferencia en este momento");
        }
    }

    /** Pagar tarjeta de crédito desde una cuenta del usuario autenticado. */
    @Transactional
    public PaymentReceipt pagarTarjeta(PaymentRequest request) {
        try {
            // validar existencia
            TarjetaDTO tarjeta = tarjetaRepository.findById(request.getTarjetaId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tarjeta no encontrada"));

            CuentaDTO cuentaOrigen = cuentaRepository.findById(request.getCuentaOrigenId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta origen no encontrada"));

            Usuario usuario = obtenerNomUsuarioAutent();

            // la cuenta origen debe pertenecer al usuario autenticado
            if (!cuentaOrigen.getUsuario().getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permiso para usar la cuenta origen");
            }

            if (request.getMonto() == null || request.getMonto() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monto inválido");
            }

            // Validar numero de tarjeta coincide con la tarjeta en DB
            if (!tarjeta.getNumeroTarjeta().equals(request.getNumeroTarjeta())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Número de tarjeta incorrecto");
            }

            // Validar formato y fecha de expiración
            java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("MM/yy");
            java.time.LocalDate ahora = java.time.LocalDate.now();

            java.time.LocalDate fechaExpiracionInput;
            try {
                fechaExpiracionInput = java.time.YearMonth.parse(request.getFechaExpiracion(), formatter).atEndOfMonth();
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fecha de expiración inválida");
            }

            if (fechaExpiracionInput.isBefore(ahora)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La tarjeta está expirada");
            }

            if (!fechaExpiracionInput.equals(tarjeta.getFechaExpiración())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fecha de expiración no coincide con la tarjeta");
            }

            // Validar CVV (simulado: aceptar solo "123" o "1234" como válido)
            if (!("123".equals(request.getCvv()) || "1234".equals(request.getCvv()))) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CVV inválido");
            }

            // Requerir OTP si no enviado
            if (request.getOtp() == null || request.getOtp().isBlank()) {
                throw new ResponseStatusException(HttpStatus.PRECONDITION_REQUIRED, "Se requiere autenticación adicional (OTP)");
            }

            if (!"123456".equals(request.getOtp())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "OTP inválido");
            }

            // Verificar saldo suficiente
            if (cuentaOrigen.getSaldo() < request.getMonto()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fondos insuficientes en la cuenta origen");
            }

            // Ejecutar pago: debitar cuenta y aumentar cupoDisponible de la tarjeta (hasta cupoTotal)
            cuentaOrigen.setSaldo(cuentaOrigen.getSaldo() - request.getMonto());

            double nuevoDisponible = (tarjeta.getCupoDisponible() == null ? 0.0 : tarjeta.getCupoDisponible()) + request.getMonto();
            if (nuevoDisponible > tarjeta.getCupoTotal())
                nuevoDisponible = tarjeta.getCupoTotal();
            tarjeta.setCupoDisponible(nuevoDisponible);

            cuentaRepository.save(cuentaOrigen);
            tarjetaRepository.save(tarjeta);

            PaymentReceipt receipt = new PaymentReceipt(UUID.randomUUID().toString(), tarjeta.getIdTarjeta(),
                    cuentaOrigen.getIdCuenta(), request.getMonto(), Instant.now(), "Pago de tarjeta exitoso");
            return receipt;
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                    "No fue posible procesar el pago en este momento");
        }
    }

    /**
     * Obtener las cuentas del usuario autenticado. Si se provee el filtro 'tipo', devuelve solo las de ese tipo.
     */
    public List<CuentaDTO> obtenerCuentas(Optional<TipoCuenta> tipoCuenta){
        Usuario usuario = obtenerNomUsuarioAutent();
        if (tipoCuenta.isPresent()){
            return cuentaRepository.findByUsuarioAndTipoCuenta(usuario, tipoCuenta.get());
        }
        return cuentaRepository.findByUsuario(usuario);
    }

    /**
     * Obtener todas las cuentas existentes en el sistema (para selección de destino).
     * No filtra por usuario.
     */
    public List<CuentaDTO> obtenerTodasCuentas() {
        return cuentaRepository.findAll();
    }

    /**
     * Obtener el saldo de una cuenta por su id si pertenece al usuario autenticado.
     * Devuelve Service Unavailable (503) si ocurre un error inesperado.
     */
    public SaldoResponse obtenerSaldoCuenta(Integer idCuenta) {
        try {
            CuentaDTO cuenta = cuentaRepository.findById(idCuenta)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta no encontrada"));

            Usuario usuario = obtenerNomUsuarioAutent();
            if (!cuenta.getUsuario().getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permiso para ver esta cuenta");
            }

            Double saldoDisponible = cuenta.getSaldo();
            // Por ahora usamos el mismo valor como saldo contable. Si hay otra lógica, reemplazar aquí.
            Double saldoContable = cuenta.getSaldo();

            return new SaldoResponse(saldoDisponible, saldoContable);
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Servicio temporalmente no disponible");
        }
    }

    /*
     * crearCuentaAhorros()
     * permite crear la cuenta de ahorros, si el usuario ya esta autenticado (obtenerNomUsuarioAutent()) y sí la cuenta ya
     * existe enviará un mensaje de error indicando que ya existe una cuenta con ese usuario, sí no es asi el metodo creará
     * la cuenta, le enviará los datos a CuentaDTO y esta clase hará la inserción de los datos en la BD.
     */
    public CuentaDTO crearCuentaAhorros(CuentaAhorrosRequest cuentaAhorrosRequest){
        
        Authentication autent = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Autenticación actual: " + autent);

        Usuario usuario = obtenerNomUsuarioAutent();
        Boolean cuentaExiste = cuentaRepository.existsByUsuarioAndTipoCuenta(usuario, TipoCuenta.AHORROS);

        //Bloque para verificar si la cuenta existe
        if (cuentaExiste) {
            System.out.println("CUENTA EXISTE");
            throw new ResponseStatusException(HttpStatus.CONFLICT,"YA EXISTE UNA CUENTA DE AHORROS PARA ESTE USUARIO");
        }

        String nombreTitular = usuario.getNomUsuario()+" "+usuario.getApellido();
        String numeroGenerado = generarNumeroCuenta(TipoCuenta.AHORROS);
        
        //Bloque que captura los datos del usuario loguedo para crear la cuenta
        CuentaDTO cuenta = CuentaDTO.builder()
            .numeroCuenta(numeroGenerado)//utiliza el metodo generarNumeroCuenta para crear el numero automaticamente
            .nombreTitular(nombreTitular)//Usa el nombre y el apellido del usuario logueado para crear el nombre del titular
            .tipoCuenta(TipoCuenta.AHORROS)//Definicion del tipo de cuenta
            .saldo(cuentaAhorrosRequest.getSaldo())//Agrega el saldo inicial de la cuenta
            .usuario(usuario)//Obtiene la id del usuario en la BD y la inserta en este campo para relacionar la cuenta con el usuario
            .build();
            
            return cuentaRepository.save(cuenta);
    }

    /*
     * crearCuentaCorriente():
     * Se verifica la existencia de un usuario con tipo de cuenta corriente, se arroja un error en caso de existencia
     * Será necesario aceptar los terminos y condiciones para crear contraseña
     * Se valida que la creacion de la cuenta sea de cuenta corriente.
     * Se genera el nombre del titular al unir nombre y apellido del usuario autenticado al iniciar sesión.
     * El número de cuenta se genera automaticamente con las iniciales, ejemplo: CO-000000
     */

     public CuentaDTO crearCuentaCorriente(CuentaCorrienteRequest cuentaCorrienteRequest){
        Usuario usuario = obtenerNomUsuarioAutent();

        if (cuentaRepository.existsByUsuarioAndTipoCuenta(usuario, TipoCuenta.CORRIENTE)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe una cuenta con este usuario");
        }

        if (Boolean.FALSE.equals(cuentaCorrienteRequest.getAceptarTYC())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Debe aceptar terminos y condiciones");
        }

        if (!EnumSet.of(TipoCuenta.CORRIENTE).contains(TipoCuenta.CORRIENTE)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de cuenta no válido.");
        }
        
        String nombreTitular = usuario.getNomUsuario()+" "+usuario.getApellido();
        String numeroGenerado = generarNumeroCuenta(TipoCuenta.CORRIENTE);
        CuentaDTO cuenta = CuentaDTO.builder()
                .numeroCuenta(numeroGenerado)
                .nombreTitular(nombreTitular)
                .tipoCuenta(TipoCuenta.CORRIENTE)
                .saldo(cuentaCorrienteRequest.getSaldo())
                .cupo(cuentaCorrienteRequest.getCupo())
                .sobregiro(cuentaCorrienteRequest.getSobregiro())
                .cupoSobregiro(cuentaCorrienteRequest.getCupoSobregiro())
                .clave(cuentaCorrienteRequest.getClave())
                .aceptarTYC(cuentaCorrienteRequest.getAceptarTYC())
                .usuario(usuario)
                .build();

                CuentaDTO cuentaGuardada =  cuentaRepository.save(cuenta);
        

        if (TipoCuenta.CORRIENTE.equals(cuentaGuardada.getTipoCuenta())) {
            tarjetaService.crearTarjeta(cuentaGuardada);
        }
    return cuentaGuardada;
                
    }


    /*
     * Metodo que genera un numero de cuenta de ahorros usando un prefijo segun el tipo de cuenta 
     * seguido de 6 numeros aleatorios unicos.
     */
    private String generarNumeroCuenta(TipoCuenta tipoCuenta){
        String prefijo;

        switch (tipoCuenta) {
            case AHORROS:
                prefijo = "AH-";
                break;
        case CORRIENTE:
                prefijo = "CO-";
                break;
            default:
                prefijo = "CU-";
                break;
        }
        
        
        String numero;
        do {
            numero = prefijo+String.format("%06d", (int)(Math.random()*1_000_000));
        } while (cuentaRepository.existsByNumeroCuenta(numero));
        return numero;
    }

    public void recargar(int id, double monto) {
        try {
            CuentaDTO cuenta = cuentaRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cuenta no encontrada"));

            Usuario usuario = obtenerNomUsuarioAutent();
            if (!cuenta.getUsuario().getId().equals(usuario.getId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "No tiene permiso para recargar esta cuenta");
            }

            if (monto <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Monto inválido");
            }

            cuenta.setSaldo(cuenta.getSaldo() + monto);
            cuentaRepository.save(cuenta);
        } catch (ResponseStatusException rse) {
            throw rse;
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Servicio temporalmente no disponible");
        }
    }
}
