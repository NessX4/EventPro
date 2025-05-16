using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("municipio")]
    public class Municipio
    {
        [Key]
        [Column("codigo")]
        public int Codigo { get; set; } // Clave primaria
        [Required]
        [MaxLength(25)]
        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        public ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();
        //public ICollection<Salon> Salones { get; set; } = new List<Salon>();

    }
}
