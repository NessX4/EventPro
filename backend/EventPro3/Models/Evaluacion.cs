using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("evaluacion")]
    public class Evaluacion
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; } // Clave primaria
        [Column("calificacion")]
        public decimal Calificacion { get; set; }
        [Column("comentarios")]
        public string Comentarios { get; set; } = string.Empty;
        [ForeignKey("Evento")]
        [Column("evento")]
        public int Evento { get; set; }
        [ForeignKey("Cliente")]
        [Column("cliente")]
        public int Cliente { get; set; }

        public Evento? EventoNavigation { get; set; }
        public Cliente? ClienteNavigation { get; set; }
    }
}
