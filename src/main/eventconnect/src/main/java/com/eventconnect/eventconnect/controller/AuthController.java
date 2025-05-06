package com.eventconnect.eventconnect.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.service.UsuarioService;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.service.UsuarioService;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collections;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Value("${google.clientId}")
    private String googleClientId;

    // --- Registro de usuario normal ---
    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.saveUsuario(usuario);
            return ResponseEntity.ok(nuevoUsuario);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar usuario");
        }
    }

    // --- Login normal de usuario ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuario) {
        Usuario existente = usuarioService.findByCorreo(usuario.getCorreo());
        if (existente != null && existente.getContraseña().equals(usuario.getContraseña())) {
            return ResponseEntity.ok(existente);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }

    // --- Login con Google ---


// Dentro de tu método @PostMapping("/google")

@PostMapping("/google")
public ResponseEntity<?> googleLogin(@RequestBody TokenRequest tokenRequest) {
    try {
        String clientId = "CLIENT_ID_AQUI"; // Copia tu Client ID de Google Cloud
        String clientSecret = "AQUI_TU_CLIENT_SECRET"; // Copia tu Client Secret de Google Cloud
        String redirectUri = "http://localhost:5173/login"; // Tu Redirect URI correcto

        // Crear el cuerpo de la solicitud
        Map<String, String> params = new HashMap<>();
        params.put("code", tokenRequest.getCode());
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("redirect_uri", redirectUri);
        params.put("grant_type", "authorization_code");

        // Formatear los parámetros como x-www-form-urlencoded
        StringBuilder formData = new StringBuilder();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            if (formData.length() > 0) formData.append("&");
            formData.append(entry.getKey()).append("=").append(entry.getValue());
        }

        // Preparar RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> request = new HttpEntity<>(formData.toString(), headers);

        // Enviar la solicitud a Google
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "https://oauth2.googleapis.com/token",
            request,
            Map.class
        );

        // Sacar el id_token de la respuesta
        Map<String, Object> responseBody = response.getBody();
        String id_token = (String) responseBody.get("id_token");

        if (id_token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: No se recibió id_token");
        }

        // Aquí verificas el id_token (como hacíamos antes)
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance()
        ).setAudience(Collections.singletonList(clientId)).build();

        GoogleIdToken idToken = verifier.verify(id_token);

        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String name = (String) payload.get("name");

            Usuario usuario = usuarioService.findByCorreo(email);
            if (usuario == null) {
                usuario = new Usuario();
                usuario.setNombre(name);
                usuario.setCorreo(email);
                usuario.setNombreUsuario(email.split("@")[0]);
                usuario.setContraseña("oauth_google");
                
                // Crear fecha de nacimiento ficticia
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                Date fechaNacimiento = formatter.parse("2000-01-01");
                usuario.setFechaNacimiento(fechaNacimiento);
                
                // Asignar tipo por defecto
                usuario.setTipo("persona"); 
                
                usuarioService.saveUsuario(usuario);
                

            }

            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token de Google inválido");
        }
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error procesando login de Google");
    }
}




// Al final de tu AuthController.java, dentro de la misma clase:
public static class TokenRequest {
    private String code;  // <<-- ahora pedimos code

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}



}
