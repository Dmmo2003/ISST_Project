package com.eventconnect.eventconnect.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eventconnect.eventconnect.model.Grupo;
import com.eventconnect.eventconnect.model.Mensaje;
import com.eventconnect.eventconnect.model.MensajeDTO;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.GrupoRepository;
import com.eventconnect.eventconnect.repository.MensajeRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;

@Service
public class MensajeServiceImpl implements MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private GrupoRepository grupoRepository;

    @Override
    public List<Mensaje> obtenerTodos() {
        return mensajeRepository.findAll();
    }

    @Override
    public Mensaje obtenerPorId(int id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
    }

    @Override
    public Mensaje crearMensaje(Mensaje mensaje) {
        return mensajeRepository.save(mensaje);
    }

    @Override
    public Mensaje actualizarMensaje(int id, Mensaje mensaje) {
        Mensaje existente = obtenerPorId(id);
        existente.setContenido(mensaje.getContenido());
        existente.setFecha(mensaje.getFecha());
        existente.setRemitente(mensaje.getRemitente());
        existente.setGrupo(mensaje.getGrupo());
        return mensajeRepository.save(existente);
    }

    @Override
    public void eliminarMensaje(int id) {
        Mensaje mensaje = obtenerPorId(id);
        mensajeRepository.delete(mensaje);
    }

    @Override
    public List<MensajeDTO> obtenerMensajesGrupo(int grupoId) {
        List<Mensaje> mensajes = mensajeRepository.findByGrupoIdOrderByFechaAsc(grupoId);
        return mensajes.stream()
                .map(MensajeDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public MensajeDTO enviarMensajeGrupo(int grupoId, String mensaje, int usuarioId) {
        Usuario remitente = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Grupo grupo = grupoRepository.findById(grupoId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        Mensaje nuevoMensaje = new Mensaje();
        nuevoMensaje.setContenido(mensaje);
        nuevoMensaje.setFecha(new Date());
        nuevoMensaje.setRemitente(remitente);
        nuevoMensaje.setGrupo(grupo);

        mensajeRepository.save(nuevoMensaje);

        return new MensajeDTO(nuevoMensaje);
    }

}
