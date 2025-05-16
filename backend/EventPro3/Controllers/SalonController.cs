using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonController : ControllerBase
    {
        private readonly EventProContext _context;

        public SalonController(EventProContext context) => _context = context;

        // GET: api/Salon
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalones()
        {
            return await _context.Salones
                .Include(s => s.MunicipioNavigation) // Incluir datos del municipio
                .Include(s => s.DisponibilidadNavigation) // Incluir datos de la disponibilidad
                .ToListAsync();
        }

        // GET: api/Salon/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Salon>> GetSalon(string id)
        {
            var salon = await _context.Salones
                .Include(s => s.MunicipioNavigation) // Incluir datos del municipio
                .Include(s => s.DisponibilidadNavigation) // Incluir datos de la disponibilidad
                .FirstOrDefaultAsync(s => s.Codigo == id);

            if (salon == null)
            {
                return NotFound();
            }

            return salon;
        }

        // PUT: api/Salon/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalon(string id, Salon salon)
        {
            if (id != salon.Codigo)
            {
                return BadRequest();
            }

            _context.Entry(salon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(salon);
        }

        // POST: api/Salon
        [HttpPost]
        public async Task<ActionResult<Salon>> PostSalon(Salon salon)
        {
            _context.Salones.Add(salon);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSalon), new { id = salon.Codigo }, salon);
        }

        // DELETE: api/Salon/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalon(string id)
        {
            var salon = await _context.Salones.FindAsync(id);
            if (salon == null)
            {
                return NotFound();
            }

            _context.Salones.Remove(salon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalonExists(string id) => _context.Salones.Any(e => e.Codigo == id);
    }
}
