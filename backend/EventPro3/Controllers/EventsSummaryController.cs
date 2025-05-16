using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsSummaryController : ControllerBase
    {
        private readonly EventProContext _context;

        public EventsSummaryController(EventProContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetEventsSummary()
        {
            var result = await _context.Eventos
                .GroupBy(e => e.FechaEvento.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    UpcomingEvents = g.Count(e => e.FechaEvento > DateTime.Now),
                    RecentEvents = g.Count(e => e.FechaEvento <= DateTime.Now)
                })
                .ToListAsync();

            var categories = result.Select(r => r.Month.ToString()).ToArray();
            var series = new[]
            {
                new { name = "Eventos Próximos", data = result.Select(r => r.UpcomingEvents).ToArray() },
                new { name = "Eventos Recientes", data = result.Select(r => r.RecentEvents).ToArray() }
            };

            return Ok(new { categories, series });
        }
    }
}
