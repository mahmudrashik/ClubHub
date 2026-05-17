package com.example.clubhub4.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class SignUpForm {
    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 2, max = 100)
    private String firstName;

    @NotBlank @Size(min = 2, max = 100)
    private String lastName;

    @NotBlank @Size(min = 6, max = 255)
    private String password;

    @NotBlank
    private String confirmPassword;

    @NotNull
    private UUID universityId;
}
