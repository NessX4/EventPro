using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("habitaciones")]
    public class Habitaciones
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; } // Clave primaria
        [MaxLength(50)]
        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty;
        [Column("precio")]
        public decimal Precio { get; set; }
        [ForeignKey("Hotel")]
        [Column("hotel")]
        public string? Hotel { get; set; }

        public Hotel? HotelNavigation { get; set; }
    }
}
