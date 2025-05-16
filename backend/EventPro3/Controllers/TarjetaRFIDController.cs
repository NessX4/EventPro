using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaRFIDController : ControllerBase
    {
        private readonly EventProContext _context;

        public TarjetaRFIDController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/TarjetaRFID
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarjetaRFID>>> GetTarjetasRFID()
        {
            return await _context.TarjetasRFID
                .Include(t => t.ListaAsistenciaNavigation)
                .ToListAsync();
        }

        // GET: api/TarjetaRFID/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TarjetaRFID>> GetTarjetaRFID(int id)
        {
            var tarjetaRFID = await _context.TarjetasRFID
                .Include(t => t.ListaAsistenciaNavigation)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tarjetaRFID == null)
            {
                return NotFound();
            }

            return tarjetaRFID;
        }

        // PUT: api/TarjetaRFID/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarjetaRFID(int id, TarjetaRFID tarjetaRFID)
        {
            if (id != tarjetaRFID.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarjetaRFID).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarjetaRFIDExists(id))
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

        // POST: api/TarjetaRFID
        [HttpPost]
        public async Task<ActionResult<TarjetaRFID>> PostTarjetaRFID(TarjetaRFID tarjetaRFID)
        {
            _context.TarjetasRFID.Add(tarjetaRFID);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarjetaRFID), new { id = tarjetaRFID.Id }, tarjetaRFID);
        }

        // DELETE: api/TarjetaRFID/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarjetaRFID(int id)
        {
            var tarjetaRFID = await _context.TarjetasRFID.FindAsync(id);
            if (tarjetaRFID == null)
            {
                return NotFound();
            }

            _context.TarjetasRFID.Remove(tarjetaRFID);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TarjetaRFIDExists(int id)
        {
            return _context.TarjetasRFID.Any(e => e.Id == id);
        }
    }
}
