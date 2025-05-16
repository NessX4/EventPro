using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransporteController : ControllerBase
    {
        private readonly EventProContext _context;

        public TransporteController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/Transporte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transporte>>> GetTransportes()
        {
            return await _context.Transportes.ToListAsync();
        }

        // GET: api/Transporte/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transporte>> GetTransporte(string id)
        {
            var transporte = await _context.Transportes.FindAsync(id);

            if (transporte == null)
            {
                return NotFound();
            }

            return transporte;
        }

        // PUT: api/Transporte/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransporte(string id, Transporte transporte)
        {
            if (id != transporte.Matricula)
            {
                return BadRequest();
            }

            _context.Entry(transporte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransporteExists(id))
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

        // POST: api/Transporte
        [HttpPost]
        public async Task<ActionResult<Transporte>> PostTransporte(Transporte transporte)
        {
            _context.Transportes.Add(transporte);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransporte), new { id = transporte.Matricula }, transporte);
        }

        // DELETE: api/Transporte/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransporte(string id)
        {
            var transporte = await _context.Transportes.FindAsync(id);
            if (transporte == null)
            {
                return NotFound();
            }

            _context.Transportes.Remove(transporte);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransporteExists(string id)
        {
            return _context.Transportes.Any(e => e.Matricula == id);
        }
    }
}
