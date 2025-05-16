using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPro3.Models
{
    [Table("factura")]
    public class Factura
    {
        [Key]
        [Column("numero")]
        public int Numero { get; set; } // Clave primaria

        [MaxLength(25)]
        [Column("descripcion")]
        public string Descripcion { get; set; } = string.Empty;

        [Column("fecha_factura")]
        public DateTime FechaFactura { get; set; }

        [Column("monto_total")]
        public decimal MontoTotal { get; set; }

        [Column("sub_total")]
        public decimal SubTotal { get; set; }

        [Column("IVA")]
        public decimal IVA { get; set; }



    }
}
