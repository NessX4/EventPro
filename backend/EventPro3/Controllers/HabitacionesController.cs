using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitacionesController : ControllerBase
    {
        private readonly EventProContext _context;

        public HabitacionesController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/Habitaciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habitaciones>>> GetHabitaciones()
        {
            return await _context.Habitaciones.ToListAsync();
        }

        // GET: api/Habitaciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habitaciones>> GetHabitaciones(int id)
        {
            var habitaciones = await _context.Habitaciones.FindAsync(id);

            if (habitaciones == null)
            {
                return NotFound();
            }

            return habitaciones;
        }

        // PUT: api/Habitaciones/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitaciones(int id, Habitaciones habitaciones)
        {
            if (id != habitaciones.Numero)
            {
                return BadRequest();
            }

            _context.Entry(habitaciones).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitacionesExists(id))
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

        // POST: api/Habitaciones
        [HttpPost]
        public async Task<ActionResult<Habitaciones>> PostHabitaciones(Habitaciones habitaciones)
        {
            _context.Habitaciones.Add(habitaciones);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHabitaciones), new { id = habitaciones.Numero }, habitaciones);
        }

        // DELETE: api/Habitaciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabitaciones(int id)
        {
            var habitaciones = await _context.Habitaciones.FindAsync(id);
            if (habitaciones == null)
            {
                return NotFound();
            }

            _context.Habitaciones.Remove(habitaciones);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitacionesExists(int id)
        {
            return _context.Habitaciones.Any(e => e.Numero == id);
        }
    }
}
