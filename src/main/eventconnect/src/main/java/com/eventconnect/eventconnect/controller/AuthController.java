package com.eventconnect.eventconnect.controller;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.model.UsuarioDTO;
import com.eventconnect.eventconnect.service.UsuarioService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

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
        // Verificar si el correo ya está registrado
        if (usuarioService.existeByCorreo(usuario.getCorreo())) {
            return ResponseEntity.badRequest().body("El correo ya está registrado.");
        }

        // Verificar si el nombre de usuario ya está registrado
        if (usuarioService.existsByUsername(usuario.getNombreUsuario())) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está registrado.");
        }

        // Guardar el usuario en la base de datos
        Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);

        // Retornar una respuesta exitosa
        return ResponseEntity.ok(nuevoUsuario);
    }

    // --- Login normal de usuario ---
    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> loginUsuario(@RequestBody Usuario usuario) {
        String correo = usuario.getCorreo();
        String contraseña = usuario.getContraseña();

        Optional<Usuario> usuarioOptional = usuarioService.getUsuarioByMailPassword(correo, contraseña);

        if (usuarioOptional.isPresent()) {
            Usuario u = usuarioOptional.get();

            UsuarioDTO usuarioDTO = new UsuarioDTO(
                    u.getId(),
                    u.getNombreUsuario(),
                    u.getCorreo(),
                    u.getNombre(),
                    u.getPrimer_Apellido(),
                    u.getSegundo_Apellido(),
                    u.getTipo());

            return ResponseEntity.ok(usuarioDTO);
        } else {
            return ResponseEntity.status(401).build(); // Código 401 si no se encuentra el usuario
        }
    }

    // --- Login con Google ---

    // Dentro de tu método @PostMapping("/google")

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody TokenRequest tokenRequest) {
        try {
            String clientId = "61992162442-9680okntj5vga0himfvvvhlst2cnqn00.apps.googleusercontent.com"; // Copia tu
                                                                                                         // Client ID de
                                                                                                         // Google Cloud
            String clientSecret = "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"; // Copia tu Client Secret de Google Cloud
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
                if (formData.length() > 0)
                    formData.append("&");
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
                    Map.class);

            // Sacar el id_token de la respuesta
            Map<String, Object> responseBody = response.getBody();
            String id_token = (String) responseBody.get("id_token");

            if (id_token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: No se recibió id_token");
            }

            // Aquí verificas el id_token (como hacíamos antes)
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance()).setAudience(Collections.singletonList(clientId)).build();

            GoogleIdToken idToken = verifier.verify(id_token);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                System.out.println( "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                System.out.println(payload);

                String email = payload.getEmail();
                String givenName = (String) payload.get("given_name");
                String familyName = (String) payload.get("family_name");
                

                Usuario usuario = usuarioService.findByCorreo(email);
                if (usuario == null) {
                    usuario = new Usuario();
                    usuario.setNombre(givenName);
                    usuario.setPrimer_Apellido(familyName);
                    usuario.setCorreo(email);
                    usuario.setNombreUsuario(email.split("@")[0]);
                    usuario.setContraseña("oauth_google");

                    // Crear fecha de nacimiento ficticia asi te va
                    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                    Date fechaNacimiento = formatter.parse("2000-01-01");
                    usuario.setFechaNacimiento(fechaNacimiento);

                    // Asignar tipo por defecto
                    usuario.setTipo("persona");

                }
                Usuario u = usuario;
                UsuarioDTO usuarioDTO = new UsuarioDTO(
                        u.getId(),
                        u.getNombreUsuario(),
                        u.getCorreo(),
                        u.getNombre(),
                        u.getPrimer_Apellido(),
                        u.getSegundo_Apellido(),
                        u.getTipo());

                return ResponseEntity.ok(usuarioDTO);

                // return ResponseEntity.ok(usuario);
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
        private String code; // <<-- ahora pedimos code

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

}
