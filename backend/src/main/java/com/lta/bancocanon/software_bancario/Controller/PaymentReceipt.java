package com.lta.bancocanon.software_bancario.Controller;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentReceipt {
    String comprobanteId;
    Integer tarjetaId;
    Integer cuentaOrigenId;
    Double monto;
    Instant fecha;
    String mensaje;
}
