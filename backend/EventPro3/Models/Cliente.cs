using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    public class Cliente
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; }

        [Required]
        [MaxLength(25)]
        [Column("nombre")]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [MaxLength(25)]
        [Column("dir_calle")]
        public string DirCalle { get; set; } = string.Empty;

        [Required]
        [Column("dir_num")]
        public int DirNum { get; set; }

        [Required]
        [MaxLength(25)]
        [Column("dir_colonia")]
        public string DirColonia { get; set; } = string.Empty;

        [Required]
        [MaxLength(15)]
        [Column("num_tel")]
        public string NumTel { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [Column("correo")]
        public string Correo { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [Column("password")]
        public string Password { get; set; } = string.Empty;

        [ForeignKey("Municipio")]
        [Column("municipio")]
        public int MunicipioId { get; set; }

        public Municipio? MunicipioNavigation { get; set; } // Puede ser nulo

        public ICollection<Evento> Eventos { get; set; } = new List<Evento>();
    }
}
