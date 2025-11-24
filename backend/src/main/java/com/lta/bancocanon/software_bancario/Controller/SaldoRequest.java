package com.lta.bancocanon.software_bancario.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaldoRequest {
    @NotNull
    @DecimalMin(value = "0.01")
    Double monto;
}
