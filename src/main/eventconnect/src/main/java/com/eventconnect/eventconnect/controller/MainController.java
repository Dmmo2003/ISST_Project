// package com.eventconnect.eventconnect.controller;

// import com.eventconnect.eventconnect.model.*;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api")
// public class MainController {

//     private final UsuarioController usuarioController;
//     private final EventoController eventoController;
//     private final MensajeController mensajeController;
//     private final GrupoController grupoController;

//     public MainController(UsuarioController usuarioController, 
//                         EventoController eventoController,
//                         MensajeController mensajeController,
//                         GrupoController grupoController) {
//         this.usuarioController = usuarioController;
//         this.eventoController = eventoController;
//         this.mensajeController = mensajeController;
//         this.grupoController = grupoController;
//     }

//     // GET Methods
//     @GetMapping("/{resource}")
//     public ResponseEntity<?> getAllResources(@PathVariable String resource) {
//         return switch(resource.toLowerCase()) {
//             case "usuarios" -> ResponseEntity.ok(usuarioController.getAllUsuarios());
//             case "eventos" -> ResponseEntity.ok(eventoController.obtenerEventos());
//             case "mensajes" -> ResponseEntity.ok(mensajeController.obtenerTodos());
//             case "grupos" -> ResponseEntity.ok(grupoController.obtenerTodos().getBody());
//             default -> ResponseEntity.notFound().build();
//         };
//     }

//     @GetMapping("/{resource}/{id}")
//     public ResponseEntity<?> getResourceById(@PathVariable String resource, @PathVariable int id) {
//         return switch(resource.toLowerCase()) {
//             case "usuarios" -> usuarioController.getUsuarioById(id);
//             case "eventos" -> ResponseEntity.ok(eventoController.obtenerEventoPorId(id));
//             case "mensajes" -> ResponseEntity.ok(mensajeController.obtenerPorId(id));
//             case "grupos" -> grupoController.obtenerPorId(id);
//             default -> ResponseEntity.notFound().build();
//         };
//     }

//     // Special GET endpoints
//     @GetMapping("/usuarios/username/{username}")
//     public ResponseEntity<Usuario> getUsuarioByUsername(@PathVariable String username) {
//         return usuarioController.getUsuarioByUsername(username);
//     }

//     @GetMapping("/grupos/admin/{adminId}")
//     public ResponseEntity<List<Grupo>> getGruposByAdminId(@PathVariable int adminId) {
//         return grupoController.obtenerPorAdminId(adminId);
//     }

//     @GetMapping("/grupos/evento/{eventoId}")
//     public ResponseEntity<List<Grupo>> getGruposByEventoId(@PathVariable int eventoId) {
//         return grupoController.obtenerPorEventoId(eventoId);
//     }

//     // POST Methods
//     @PostMapping("/{resource}")
//     public ResponseEntity<?> createResource(@PathVariable String resource, @RequestBody Object requestBody) {
//         return switch(resource.toLowerCase()) {
//             case "usuarios" -> ResponseEntity.ok(usuarioController.createUsuario((Usuario) requestBody));
//             case "eventos" -> ResponseEntity.ok(eventoController.crearEvento((Evento) requestBody));
//             case "mensajes" -> ResponseEntity.ok(mensajeController.crearMensaje((Mensaje) requestBody));
//             case "grupos" -> grupoController.crearGrupo((Grupo) requestBody);
//             default -> ResponseEntity.notFound().build();
//         };
//     }

//     // PUT Methods
//     @PutMapping("/{resource}/{id}")
//     public ResponseEntity<?> updateResource(@PathVariable String resource, 
//                                           @PathVariable int id, 
//                                           @RequestBody Object requestBody) {
//         return switch(resource.toLowerCase()) {
//             case "usuarios" -> usuarioController.updateUsuario(id, (Usuario) requestBody);
//             case "eventos" -> ResponseEntity.ok(eventoController.actualizarEvento(id, (Evento) requestBody));
//             case "mensajes" -> ResponseEntity.ok(mensajeController.actualizarMensaje(id, (Mensaje) requestBody));
//             case "grupos" -> grupoController.actualizarGrupo(id, (Grupo) requestBody);
//             default -> ResponseEntity.notFound().build();
//         };
//     }

//     // DELETE Methods
//     @DeleteMapping("/{resource}/{id}")
//     public ResponseEntity<?> deleteResource(@PathVariable String resource, @PathVariable int id) {
//         return switch(resource.toLowerCase()) {
//             case "usuarios" -> usuarioController.deleteUsuario(id);
//             case "eventos" -> {
//                 eventoController.eliminarEvento(id);
//                 yield ResponseEntity.noContent().build();
//             }
//             case "mensajes" -> {
//                 mensajeController.eliminarMensaje(id);
//                 yield ResponseEntity.noContent().build();
//             }
//             case "grupos" -> grupoController.borrarGrupo(id);
//             default -> ResponseEntity.notFound().build();
//         };
//     }
// }