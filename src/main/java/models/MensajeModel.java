package models;
import java.util.Date;

public class MensajeModel {

    private Long id; // Cambiado de Int a Long

    private String contenido;

    private Date fecha;

    private String remitente;

    private String grupo;

    // Constructor vacío (necesario para JPA)
    public MensajeModel() {}

    // Constructor con parámetros
    public MensajeModel(String contenido, Date fecha, String remitente, String grupo) {
        this.contenido = contenido;
        this.fecha = fecha;
        this.remitente = remitente;
        this.grupo = grupo;
    }

    // Getters y Setters
    public Long getId() { // Cambiado el tipo de retorno a Long
        return id;
    }

    public void setId(Long id) { // Cambiado el tipo a Long
        this.id = id;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getRemitente() {
        return remitente;
    }

    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    // Método toString() para depuración
    public String toString() {
        return "Mensaje{" +
                "id=" + id +
                ", contenido='" + contenido + '\'' +
                ", fecha=" + fecha +
                ", remitente=" + (remitente != null ? remitente : "null") +
                ", grupo=" + (grupo != null ? grupo : "null") +
                '}';
    }
}

