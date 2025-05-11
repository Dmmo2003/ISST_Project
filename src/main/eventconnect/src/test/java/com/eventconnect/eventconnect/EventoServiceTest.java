package com.eventconnect.eventconnect;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.eventconnect.eventconnect.model.Evento;
import com.eventconnect.eventconnect.model.Usuario;
import com.eventconnect.eventconnect.repository.EventoRepository;
import com.eventconnect.eventconnect.repository.UsuarioRepository;
import com.eventconnect.eventconnect.service.EventoService;

@SpringBootTest
class EventoServiceTest {

    @Autowired
    private EventoService eventoService;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario creador;

    @BeforeEach
    void setup() {
        eventoRepository.deleteAll();
        usuarioRepository.deleteAll();

        creador = new Usuario();
        creador.setNombre("Ana");
        creador.setPrimer_Apellido("López");
        creador.setSegundo_Apellido("Martínez");
        creador.setNombreUsuario("ana123");
        creador.setFechaNacimiento(
                Date.from(LocalDate.of(2000, 1, 1).atStartOfDay(ZoneId.systemDefault()).toInstant()));
        creador.setCorreo("ana@example.com");
        creador.setContraseña("password");
        creador.setTipo("persona");

        creador = usuarioRepository.save(creador);
    }

    @Test
    void crearEventoCorrectamente() {
        Evento evento = new Evento();
        evento.setNombre("Concierto de Rock");
        evento.setDescripcion("Un concierto con bandas locales.");
        evento.setFecha(Timestamp.valueOf(LocalDate.of(2000, 1, 1).atStartOfDay()));
        evento.setUbicacion("Madrid");
        evento.setOrganizador(creador);
        evento.setCategoria("Festival");
        evento.setPrecio(new BigDecimal("1"));

        Evento creado = eventoService.crearEvento(evento);

        assertNotNull(creado.getId());
        assertEquals("Concierto de Rock", creado.getNombre());
        assertEquals("Madrid", creado.getUbicacion());
        assertEquals(creador.getId(), creado.getOrganizador().getId());
        System.out.println("Evento creado con ID: " + creado.getId());

    }

    @Test
    void borrarEventoCorrectamente() {
        // Crear evento
        Evento evento = new Evento();
        evento.setNombre("Fiesta de Fin de Año");
        evento.setDescripcion("Celebración con fuegos artificiales.");
        evento.setFecha(Timestamp.valueOf(LocalDate.of(2025, 12, 31).atStartOfDay()));
        evento.setUbicacion("Barcelona");
        evento.setOrganizador(creador);
        evento.setCategoria("Festival");
        evento.setPrecio(new BigDecimal("20"));

        Evento creado = eventoService.crearEvento(evento);
        int eventoId = creado.getId();

        // Asegurarse de que se ha guardado
        assertNotNull(eventoRepository.findById(eventoId).orElse(null));

        // Borrar evento
        eventoService.eliminarEvento(eventoId);

        // Comprobar que se ha eliminado
        assertEquals(false, eventoRepository.findById(eventoId).isPresent());
    }

}
