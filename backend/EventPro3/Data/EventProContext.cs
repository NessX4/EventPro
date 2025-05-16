using Microsoft.EntityFrameworkCore;
using EventPro3.Models;

namespace EventPro3.Data
{
    public class EventProContext : DbContext
    {
        public EventProContext(DbContextOptions<EventProContext> options) : base(options) { }

        public DbSet<Municipio> Municipios { get; set; }
        public DbSet<Disponibilidad> Disponibilidades { get; set; }
        public DbSet<Salon> Salones { get; set; }
        public DbSet<ListaAsistencia> ListasAsistencia { get; set; }
        public DbSet<TarjetaRFID> TarjetasRFID { get; set; }
        public DbSet<RegistroAcceso> RegistrosAcceso { get; set; }
        public DbSet<ServiciosPaquetes> ServiciosPaquetes { get; set; }
        public DbSet<Estado> Estados { get; set; }
        public DbSet<Transporte> Transportes { get; set; }
        public DbSet<Factura> Facturas { get; set; }
        public DbSet<Hotel> Hoteles { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Evaluacion> Evaluaciones { get; set; }
        public DbSet<Habitaciones> Habitaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Municipio>().ToTable("municipio");
            modelBuilder.Entity<Disponibilidad>().ToTable("disponibilidad");
            modelBuilder.Entity<Salon>().ToTable("salon");
            modelBuilder.Entity<ListaAsistencia>().ToTable("lista_asistencia");
            modelBuilder.Entity<TarjetaRFID>().ToTable("tarjeta_RFID");
            modelBuilder.Entity<RegistroAcceso>().ToTable("registro_acceso");
            modelBuilder.Entity<ServiciosPaquetes>().ToTable("servicios_paquetes");
            modelBuilder.Entity<Estado>().ToTable("estado");
            modelBuilder.Entity<Transporte>().ToTable("transporte");
            modelBuilder.Entity<Factura>().ToTable("factura");
            modelBuilder.Entity<Hotel>().ToTable("hotel");
            modelBuilder.Entity<Cliente>().ToTable("cliente");
            modelBuilder.Entity<Evento>().ToTable("evento");
            modelBuilder.Entity<Evaluacion>().ToTable("evaluacion");
            modelBuilder.Entity<Habitaciones>().ToTable("habitaciones");

            // Configurar eliminación en cascada para eventos relacionados con clientes
            modelBuilder.Entity<Evento>()
                .HasOne(e => e.ClienteNavigation)
                .WithMany(c => c.Eventos)
                .HasForeignKey(e => e.Cliente)
                .OnDelete(DeleteBehavior.Cascade);

            // Otras configuraciones de relaciones...
            modelBuilder.Entity<Salon>()
                .HasOne(s => s.DisponibilidadNavigation)
                .WithMany()
                .HasForeignKey(s => s.Disponibilidad);

            modelBuilder.Entity<Salon>()
                .HasOne(s => s.MunicipioNavigation)
                .WithMany()
                .HasForeignKey(s => s.Municipio);

            modelBuilder.Entity<TarjetaRFID>()
                .HasOne(t => t.ListaAsistenciaNavigation)
                .WithMany()
                .HasForeignKey(t => t.ListaAsistenciaNumero);

            modelBuilder.Entity<RegistroAcceso>()
                .HasOne(r => r.TarjetaRFIDNavigation)
                .WithMany()
                .HasForeignKey(r => r.TarjetaRFIDId);

            modelBuilder.Entity<RegistroAcceso>()
                .HasOne(r => r.SalonNavigation)
                .WithMany()
                .HasForeignKey(r => r.SalonCodigo);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.SalonNavigation)
                .WithMany()
                .HasForeignKey(e => e.Salon);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.HotelNavigation)
                .WithMany()
                .HasForeignKey(e => e.Hotel);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.EstadoNavigation)
                .WithMany()
                .HasForeignKey(e => e.Estado);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.TransporteNavigation)
                .WithMany()
                .HasForeignKey(e => e.Transporte);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.ServiciosNavigation)
                .WithMany()
                .HasForeignKey(e => e.Servicios);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.FacturaNavigation)
                .WithMany()
                .HasForeignKey(e => e.Factura);

            modelBuilder.Entity<Evento>()
                .HasOne(e => e.ListaAsistenciaNavigation)
                .WithMany()
                .HasForeignKey(e => e.ListaAsistencia);

            modelBuilder.Entity<Evaluacion>()
                .HasOne(ev => ev.EventoNavigation)
                .WithMany()
                .HasForeignKey(ev => ev.Evento);

            modelBuilder.Entity<Evaluacion>()
                .HasOne(ev => ev.ClienteNavigation)
                .WithMany()
                .HasForeignKey(ev => ev.Cliente);

            modelBuilder.Entity<Habitaciones>()
                .HasOne(h => h.HotelNavigation)
                .WithMany()
                .HasForeignKey(h => h.Hotel);

            base.OnModelCreating(modelBuilder);
        }
    }
}
