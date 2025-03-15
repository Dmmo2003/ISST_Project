package repositories;

import models.MensajeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<MensajeModel, Integer> {
    List<MensajeModel> findByGrupoId(int grupoId);
    List<MensajeModel> findByRemitenteId(int remitenteId);
}
