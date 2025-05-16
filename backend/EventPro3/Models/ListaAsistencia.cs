using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("lista_asistencia")]
    public class ListaAsistencia
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; } // Clave primaria
        [Column("hora_registro")]
        public TimeSpan HoraRegistro { get; set; }
        [MaxLength(25)]
        [Column("nombre_empleado")]
        public string NombreEmpleado { get; set; } = string.Empty;
        [MaxLength(25)]
        [Column("area")]
        public string Area { get; set; } = string.Empty;
    }
}
