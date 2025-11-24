package com.lta.bancocanon.software_bancario.Controller;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    @NotNull
    Integer tarjetaId;

    @NotNull
    Integer cuentaOrigenId;

    @NotNull
    @DecimalMin(value = "0.01")
    Double monto;

    // OTP opcional para confirmación
    String otp;

    @NotNull
    @Size(min = 16, max = 16, message = "El número de tarjeta debe tener 16 dígitos")
    @Pattern(regexp = "\\d{16}", message = "El número de tarjeta debe contener solo números")
    String numeroTarjeta;

    @NotNull
    @Pattern(regexp = "(0[1-9]|1[0-2])\\/\\d{2}", message = "La fecha de expiración debe tener formato MM/yy")
    String fechaExpiracion;  // Formato MM/yy

    @NotNull
    @Size(min = 3, max = 4, message = "El CVV debe tener entre 3 y 4 dígitos")
    @Pattern(regexp = "\\d{3,4}", message = "El CVV debe contener solo números")
    String cvv;
}
