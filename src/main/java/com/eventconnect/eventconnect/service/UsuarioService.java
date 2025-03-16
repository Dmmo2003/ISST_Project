package main.java.com.eventconnect.eventconnect.service;

import com.eventconnect.model.UsuarioModel;
import com.eventconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.eventconnect.eventconnect.repository.EventoRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EventoRepository eventoRepository;
    
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> obtenerUsuarioPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Optional<Usuario> obtenerUsuarioPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

 //Permite a un usuario seguir un evento
    public void seguirEvento(Long usuarioId, Long eventoId) {
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Evento evento = eventoRepository.findById(eventoId)
                            .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        if (!usuario.getEventosSeguidos().contains(evento)) { 
            usuario.getEventosSeguidos().add(evento);
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("El usuario ya sigue este evento");
        }
    }

    
 //Obtiene la lista de eventos seguidos por un usuario
    public List<Evento> obtenerEventosSeguidos(Long usuarioId) {
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return usuario.getEventosSeguidos();
    }  

  ////Permite a un usuario abandonar un evento en el que está inscrito  
    public Usuario abandonarEvento(Long usuarioId, Long eventoId) {
        Evento evento = eventoRepository.findById(eventoId)
            .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
    
        if (usuario.getEventosInscritos().contains(evento)) {
            usuario.getEventosInscritos().remove(evento);
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("El usuario no está inscrito en este evento");
        }   
        return usuario;
    }
}
