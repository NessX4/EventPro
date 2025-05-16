using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("transporte")]
    public class Transporte
    {
        [Key]
        [MaxLength(10)]
        [Column("matricula")]
        public string Matricula { get; set; } = string.Empty; // Clave primaria
        [Column("capacidad")]
        public int Capacidad { get; set; }
        [Column("costo")]
        public decimal Costo { get; set; }
        [Column("image_url")]
         public string? ImageUrl { get; set; }// Nueva propiedad para la URL de la imagen


    }
}
