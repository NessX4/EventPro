using EventPro3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Evento
{
    [Key]
    [Column("numero")]
    public int Numero { get; set; }

    [Column("fecha_registro")]
    public DateTime FechaRegistro { get; set; }

    [Column("fecha_evento")]
    public DateTime FechaEvento { get; set; }

    [Column("evento_inicio")]
    public TimeSpan EventoInicio { get; set; }

    [Column("evento_fin")]
    public TimeSpan EventoFin { get; set; }

    [Column("duracion")]
    public TimeSpan? Duracion { get; set; }

    [Column("cantidad_personas")]
    public int CantidadPersonas { get; set; }

    [ForeignKey("Salon")]
    [Column("salon")]
    public string? Salon { get; set; }

    [ForeignKey("Hotel")]
    [Column("hotel")]
    public string? Hotel { get; set; }

    [ForeignKey("Estado")]
    [Column("estado")]
    public string? Estado { get; set; }

    [ForeignKey("Transporte")]
    [Column("transporte")]
    public string? Transporte { get; set; }

    [ForeignKey("ServiciosPaquetes")]
    [Column("servicios")]
    public int? Servicios { get; set; }

    [ForeignKey("Factura")]
    [Column("factura")]
    public int? Factura { get; set; }

    [ForeignKey("ListaAsistencia")]
    [Column("lista_asistencia")]
    public int? ListaAsistencia { get; set; }

    [ForeignKey("Cliente")]
    [Column("cliente")]
    public int? Cliente { get; set; }

    public Salon? SalonNavigation { get; set; }
    public Hotel? HotelNavigation { get; set; }
    public Estado? EstadoNavigation { get; set; }
    public Transporte? TransporteNavigation { get; set; }
    public ServiciosPaquetes? ServiciosNavigation { get; set; }
    public Factura? FacturaNavigation { get; set; }
    public ListaAsistencia? ListaAsistenciaNavigation { get; set; }
    public Cliente? ClienteNavigation { get; set; }
}
