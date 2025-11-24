package com.lta.bancocanon.software_bancario.Controller;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferReceipt {
    String comprobanteId;
    Integer origenId;
    Integer destinoId;
    Double monto;
    Instant fecha;
    String mensaje;
}
