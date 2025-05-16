using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using System.Linq;
using System.Threading.Tasks;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsStatsController : ControllerBase
    {
        private readonly EventProContext _context;

        public ClientsStatsController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetClientsStats()
        {
            // Usando la propiedad "Numero" solo para ilustrar
            var result = await _context.Clientes
                .GroupBy(c => c.Numero % 12)  // Agrupación ficticia por número mod 12 (simula meses)
                .Select(g => new
                {
                    Month = g.Key,
                    NewClients = g.Count()
                })
                .ToListAsync();

            var categories = result.Select(r => r.Month.ToString()).ToArray();
            var series = new[]
            {
                new { name = "Clientes Nuevos", data = result.Select(r => r.NewClients).ToArray() }
            };

            return Ok(new { categories, series });
        }
    }
}
