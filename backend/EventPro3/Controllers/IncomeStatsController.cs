using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using System.Linq;
using System.Threading.Tasks;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IncomeStatsController : ControllerBase
    {
        private readonly EventProContext _context;

        public IncomeStatsController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetIncomeStats()
        {
            var result = await _context.Facturas
                .GroupBy(f => f.FechaFactura.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    Income = g.Sum(f => f.MontoTotal)
                })
                .ToListAsync();

            var series = new[]
            {
                new
                {
                    name = "Ingresos",
                    colorByPoint = true,
                    data = result.Select(r => new { name = r.Month.ToString(), y = r.Income }).ToArray()
                }
            };

            return Ok(new { series });
        }
    }
}
