using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly EventProContext _context;

        public EventoController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
        {
            return await _context.Eventos
                .Include(e => e.SalonNavigation)
                .Include(e => e.HotelNavigation)
                .Include(e => e.EstadoNavigation)
                .Include(e => e.TransporteNavigation)
                .Include(e => e.ServiciosNavigation)
                .Include(e => e.FacturaNavigation)
                .Include(e => e.ListaAsistenciaNavigation)
                .Include(e => e.ClienteNavigation)
                .ToListAsync();
        }


        // GET: api/Evento/{numero}
        [HttpGet("{numero}")]
        public async Task<ActionResult<Evento>> GetEvento(int numero)
        {
            var evento = await _context.Eventos
                .Include(e => e.SalonNavigation)
                .Include(e => e.HotelNavigation)
                .Include(e => e.EstadoNavigation)
                .Include(e => e.TransporteNavigation)
                .Include(e => e.ServiciosNavigation)
                .Include(e => e.FacturaNavigation)
                .Include(e => e.ListaAsistenciaNavigation)
                .Include(e => e.ClienteNavigation)
                .FirstOrDefaultAsync(e => e.Numero == numero);

            if (evento == null)
            {
                return NotFound();
            }

            return evento;
        }

        // PUT: api/Evento/{numero}
        [HttpPut("{numero}")]
        public async Task<IActionResult> PutEvento(int numero, Evento evento)
        {
            if (numero != evento.Numero)
            {
                return BadRequest();
            }

            _context.Entry(evento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventoExists(numero))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Evento
        [HttpPost]
        public async Task<ActionResult<Evento>> PostEvento(Evento evento)
        {
            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvento), new { numero = evento.Numero }, evento);
        }

        // DELETE: api/Evento/{numero}
        [HttpDelete("{numero}")]
        public async Task<IActionResult> DeleteEvento(int numero)
        {
            var evento = await _context.Eventos.FindAsync(numero);
            if (evento == null)
            {
                return NotFound();
            }

            _context.Eventos.Remove(evento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventoExists(int numero)
        {
            return _context.Eventos.Any(e => e.Numero == numero);
        }
    }
}
