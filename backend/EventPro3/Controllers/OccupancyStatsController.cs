using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using System.Linq;
using System.Threading.Tasks;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OccupancyStatsController : ControllerBase
    {
        private readonly EventProContext _context;

        public OccupancyStatsController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetOccupancyStats()
        {
            // Usar alguna propiedad existente para agrupar, por ejemplo "Codigo"
            var salones = await _context.Salones
                .GroupBy(s => s.Codigo.Substring(0, 6))  // Agrupación ficticia, reemplazar con propiedad real
                .Select(g => new
                {
                    Period = g.Key,
                    Occupancy = g.Average(s => s.Costo)  // Cambiar por propiedad real de ocupación
                })
                .ToListAsync();

            var transportes = await _context.Transportes
                .GroupBy(t => t.Matricula.Substring(0, 6))  // Agrupación ficticia, reemplazar con propiedad real
                .Select(g => new
                {
                    Period = g.Key,
                    Occupancy = g.Average(t => t.Costo)  // Cambiar por propiedad real de ocupación
                })
                .ToListAsync();

            var categories = salones.Select(s => s.Period).Distinct().ToArray();
            var series = new[]
            {
                new { name = "Salones", data = salones.Select(s => s.Occupancy).ToArray() },
                new { name = "Transportes", data = transportes.Select(t => t.Occupancy).ToArray() }
            };

            return Ok(new { categories, series });
        }
    }
}
