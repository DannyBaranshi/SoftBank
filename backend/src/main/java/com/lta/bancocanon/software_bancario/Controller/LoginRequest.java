package com.lta.bancocanon.software_bancario.Controller;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    String nomUsuario;
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    String contrasena;
}
