using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("disponibilidad")]
    public class Disponibilidad
    {
        [Key]
        [MaxLength(5)]
        [Column("codigo")]
        public string Codigo { get; set; } = string.Empty; // Clave primaria
        [MaxLength(10)]
        [Column("descripcion")]
        public string Descripcion { get; set; } = string.Empty;
    }
}
