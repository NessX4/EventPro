using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroAccesoController : ControllerBase
    {
        private readonly EventProContext _context;

        public RegistroAccesoController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/RegistroAcceso
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistroAcceso>>> GetRegistrosAcceso()
        {
            return await _context.RegistrosAcceso
                .Include(r => r.TarjetaRFIDNavigation)
                .Include(r => r.SalonNavigation)
                .ToListAsync();
        }

        // GET: api/RegistroAcceso/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroAcceso>> GetRegistroAcceso(int id)
        {
            var registroAcceso = await _context.RegistrosAcceso
                .Include(r => r.TarjetaRFIDNavigation)
                .Include(r => r.SalonNavigation)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (registroAcceso == null)
            {
                return NotFound();
            }

            return registroAcceso;
        }

        // PUT: api/RegistroAcceso/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistroAcceso(int id, RegistroAcceso registroAcceso)
        {
            if (id != registroAcceso.Id)
            {
                return BadRequest();
            }

            _context.Entry(registroAcceso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroAccesoExists(id))
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

        // POST: api/RegistroAcceso
        [HttpPost]
        public async Task<ActionResult<RegistroAcceso>> PostRegistroAcceso(RegistroAcceso registroAcceso)
        {
            _context.RegistrosAcceso.Add(registroAcceso);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRegistroAcceso), new { id = registroAcceso.Id }, registroAcceso);
        }

        // DELETE: api/RegistroAcceso/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistroAcceso(int id)
        {
            var registroAcceso = await _context.RegistrosAcceso.FindAsync(id);
            if (registroAcceso == null)
            {
                return NotFound();
            }

            _context.RegistrosAcceso.Remove(registroAcceso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroAccesoExists(int id)
        {
            return _context.RegistrosAcceso.Any(e => e.Id == id);
        }
    }
}
