using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("hotel")]
    public class Hotel
    {
        [Key]
  
        [Column("codigo")]
        public string Codigo { get; set; } = string.Empty; // Clave primaria

     
        [Column("nombre")]
        public string? Nombre { get; set; }  // Permitir valores NULL

     
        [Column("dir_calle")]
        public string? DirCalle { get; set; }  // Permitir valores NULL

        [Column("dir_num")]
        public int? DirNum { get; set; }  // Permitir valores NULL

        
        [Column("dir_colonia")]
        public string? DirColonia { get; set; }  // Permitir valores NULL

       
        [Column("contacto")]
        public string? Contacto { get; set; }  // Permitir valores NULL

        
        [Column("image_url")]
        public string? ImageUrl { get; set; }  // Permitir valores NULL
    }
}
