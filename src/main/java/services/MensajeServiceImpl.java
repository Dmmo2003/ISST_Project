package services;



import models.MensajeModel;
import repositories.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MensajeServiceImpl implements MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Override
    public List<MensajeModel> obtenerTodos() {
        return mensajeRepository.findAll();
    }

    @Override
    public MensajeModel obtenerPorId(int id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
    }

    @Override
    public MensajeModel crearMensaje(MensajeModel mensaje) {
        return mensajeRepository.save(mensaje);
    }

    @Override
    public MensajeModel actualizarMensaje(int id, MensajeModel mensaje) {
        MensajeModel existente = obtenerPorId(id);
        existente.setContenido(mensaje.getContenido());
        existente.setFecha(mensaje.getFecha());
        existente.setRemitente(mensaje.getRemitente());
        existente.setGrupo(mensaje.getGrupo());
        return mensajeRepository.save(existente);
    }

    @Override
    public void eliminarMensaje(int id) {
        MensajeModel mensaje = obtenerPorId(id);
        mensajeRepository.delete(mensaje);
    }

}
