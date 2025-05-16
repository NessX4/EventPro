using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using System.Linq;
using System.Threading.Tasks;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesStatsController : ControllerBase
    {
        private readonly EventProContext _context;

        public ServicesStatsController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetServicesStats()
        {
            var result = await _context.ServiciosPaquetes
                .GroupBy(s => s.Nombre)  // Suponiendo que 'Nombre' es una propiedad relevante para agrupar
                .Select(g => new
                {
                    ServiceName = g.Key,
                    TotalAmount = g.Sum(s => s.Precio) // Suponiendo que hay una propiedad de costo o monto
                })
                .ToListAsync();

            var categories = result.Select(r => r.ServiceName).ToArray();
            var series = new[]
            {
                new { name = "Servicios", data = result.Select(r => r.TotalAmount).ToArray() }
            };

            return Ok(new { categories, series });
        }
    }
}
