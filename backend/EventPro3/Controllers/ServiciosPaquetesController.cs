using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiciosPaquetesController : ControllerBase
    {
        private readonly EventProContext _context;

        public ServiciosPaquetesController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/ServiciosPaquetes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiciosPaquetes>>> GetServiciosPaquetes()
        {
            return await _context.ServiciosPaquetes.ToListAsync();
        }

        // GET: api/ServiciosPaquetes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiciosPaquetes>> GetServiciosPaquetes(int id)
        {
            var serviciosPaquetes = await _context.ServiciosPaquetes.FindAsync(id);

            if (serviciosPaquetes == null)
            {
                return NotFound();
            }

            return serviciosPaquetes;
        }

        // PUT: api/ServiciosPaquetes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiciosPaquetes(int id, ServiciosPaquetes serviciosPaquetes)
        {
            if (id != serviciosPaquetes.Numero)
            {
                return BadRequest();
            }

            _context.Entry(serviciosPaquetes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiciosPaquetesExists(id))
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

        // POST: api/ServiciosPaquetes
        [HttpPost]
        public async Task<ActionResult<ServiciosPaquetes>> PostServiciosPaquetes(ServiciosPaquetes serviciosPaquetes)
        {
            _context.ServiciosPaquetes.Add(serviciosPaquetes);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetServiciosPaquetes), new { id = serviciosPaquetes.Numero }, serviciosPaquetes);
        }

        // DELETE: api/ServiciosPaquetes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiciosPaquetes(int id)
        {
            var serviciosPaquetes = await _context.ServiciosPaquetes.FindAsync(id);
            if (serviciosPaquetes == null)
            {
                return NotFound();
            }

            _context.ServiciosPaquetes.Remove(serviciosPaquetes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiciosPaquetesExists(int id)
        {
            return _context.ServiciosPaquetes.Any(e => e.Numero == id);
        }
    }
}

