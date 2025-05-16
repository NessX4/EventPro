using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("registro_acceso")]
    public class RegistroAcceso
    {
        [Key]
        [Column("id")]
        public int Id { get; set; } // Clave primaria
        [Column("hora_acceso")]
        public DateTime HoraAcceso { get; set; }
        [ForeignKey("TarjetaRFID")]
        [Column("tarjeta_RFID_id")]
        public int? TarjetaRFIDId { get; set; }
        [ForeignKey("Salon")]
        [Column("salon_codigo")]
        public string? SalonCodigo { get; set; }

        public TarjetaRFID? TarjetaRFIDNavigation { get; set; }
        public Salon? SalonNavigation { get; set; }
    }
}
