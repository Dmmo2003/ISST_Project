package services;



import models.MensajeModel;
import com.eventconnect.mensaje.repository.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MensajeServiceImpl implements MensajeService {

    @Autowired
    private MensajeRepository mensajeRepository;

    @Override
    public List<MensajeModel> obtenerTodos() {
        return mensajeRepository.findAll();
    }

    @Override
    public MensajeModel obtenerPorId(Long id) {
        return mensajeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado con id: " + id));
    }

    @Override
    public MensajeModel crearMensaje(MensajeModel mensaje) {
        return mensajeRepository.save(mensaje);
    }

    @Override
    public MensajeModel actualizarMensaje(Long id, MensajeModel mensaje) {
        MensajeModel existente = obtenerPorId(id);
        existente.setContenido(mensaje.getContenido());
        existente.setFecha(mensaje.getFecha());
        existente.setRemitente(mensaje.getRemitente());
        existente.setGrupo(mensaje.getGrupo());
        return mensajeRepository.save(existente);
    }

    @Override
    public void eliminarMensaje(Long id) {
        MensajeModel mensaje = obtenerPorId(id);
        mensajeRepository.delete(mensaje);
    }

    // Métodos adicionales (si los necesitas)
    public List<MensajeModel> obtenerMensajesPorGrupo(Long grupoId) {
        return mensajeRepository.findByGrupoId(grupoId);
    }

    public List<MensajeModel> obtenerMensajesPorRemitente(Long remitenteId) {
        return mensajeRepository.findByRemitenteId(remitenteId);
    }
}
