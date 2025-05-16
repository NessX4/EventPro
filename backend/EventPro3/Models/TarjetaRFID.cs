using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("tarjeta_RFID")]
    public class TarjetaRFID
    {
        [Key]
        [Column("id")]
        public int Id { get; set; } // Clave primaria
        [MaxLength(50)]
        [Column("codigo")]
        public string Codigo { get; set; } = string.Empty;
        [ForeignKey("ListaAsistencia")]
        [Column("lista_asistencia_numero")]
        public int? ListaAsistenciaNumero { get; set; }

        public ListaAsistencia? ListaAsistenciaNavigation { get; set; }
    }
}
