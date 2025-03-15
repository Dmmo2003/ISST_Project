package models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Mensaje")  // Vincula con la tabla en la base de datos
public class MensajeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto_increment
    private int id;  // Lo cambié a int, ya que en tu BD los IDs son INT

    @Column(nullable = false)
    private String contenido;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "Remitente_Id", nullable = false)  // Relación con Usuario
    private UsuarioModel remitente;

    @ManyToOne
    @JoinColumn(name = "Grupo_Id", nullable = false)  // Relación con Grupo
    private GrupoModel grupo;

    // Constructor vacío (JPA lo necesita)
    public MensajeModel() {}

    // Constructor con parámetros
    public MensajeModel(String contenido, Date fecha, UsuarioModel remitente, GrupoModel grupo) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.remitente = remitente;
        this.grupo = grupo;
    }

    // Getters y Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public UsuarioModel getRemitente() { return remitente; }
    public void setRemitente(UsuarioModel remitente) { this.remitente = remitente; }

    public GrupoModel getGrupo() { return grupo; }
    public void setGrupo(GrupoModel grupo) { this.grupo = grupo; }
}
