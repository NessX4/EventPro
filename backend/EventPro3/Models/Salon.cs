using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("salon")]
    public class Salon
    {
        [Key]
        [MaxLength(15)]
        [Column("codigo")]
        public string Codigo { get; set; } = string.Empty; // Clave primaria

        [MaxLength(20)]
        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [MaxLength(25)]
        [Column("dir_calle")]
        public string DirCalle { get; set; } = string.Empty;

        [Column("dir_num")]
        public int DirNum { get; set; }

        [MaxLength(25)]
        [Column("dir_colonia")]
        public string DirColonia { get; set; } = string.Empty;

        [Column("costo")]
        public decimal Costo { get; set; }

        [ForeignKey("Disponibilidad")]
       
        [Column("disponibilidad")]
        public string? Disponibilidad { get; set; }

        [ForeignKey("Municipio")]
        [Column("municipio")]
        public int Municipio { get; set; }

       
        [Column("image_url")]
        public string? ImageUrl { get; set; } 
        
        
        // Permitir valores NULL

        public Disponibilidad? DisponibilidadNavigation { get; set; }
        public Municipio? MunicipioNavigation { get; set; }

    }
}
