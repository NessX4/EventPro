using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("servicios_paquetes")]
    public class ServiciosPaquetes
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; } // Clave primaria

        [MaxLength(50)]
        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [Column("descripcion")]
        public string Descripcion { get; set; } = string.Empty;

        [Column("precio")]
        public decimal Precio { get; set; }

        [Column("image_url")]
        public string? ImageUrl { get; set; }  // Permitir valores NULL


    }
}
