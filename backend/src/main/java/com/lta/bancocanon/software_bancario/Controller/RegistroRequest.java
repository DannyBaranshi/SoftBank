package com.lta.bancocanon.software_bancario.Controller;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data       //Agrega los getters y setters automaticamente
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroRequest {
    String nomUsuario;
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    String contrasena;
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    String confirmContrasena;
    String cedula;
    String nombre;
    String apellido;
    String correo;
    String telefono;
}
