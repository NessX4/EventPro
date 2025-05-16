using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;

namespace EventPro3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListaAsistenciaController : ControllerBase
    {
        private readonly EventProContext _context;

        public ListaAsistenciaController(EventProContext context)
        {
            _context = context;
        }

        // GET: api/ListaAsistencia
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListaAsistencia>>> GetListasAsistencia()
        {
            return await _context.ListasAsistencia.ToListAsync();
        }

        // GET: api/ListaAsistencia/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListaAsistencia>> GetListaAsistencia(int id)
        {
            var listaAsistencia = await _context.ListasAsistencia.FindAsync(id);

            if (listaAsistencia == null)
            {
                return NotFound();
            }

            return listaAsistencia;
        }

        // PUT: api/ListaAsistencia/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListaAsistencia(int id, ListaAsistencia listaAsistencia)
        {
            if (id != listaAsistencia.Numero)
            {
                return BadRequest();
            }

            _context.Entry(listaAsistencia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListaAsistenciaExists(id))
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

        // POST: api/ListaAsistencia
        [HttpPost]
        public async Task<ActionResult<ListaAsistencia>> PostListaAsistencia(ListaAsistencia listaAsistencia)
        {
            _context.ListasAsistencia.Add(listaAsistencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetListaAsistencia), new { id = listaAsistencia.Numero }, listaAsistencia);
        }

        // DELETE: api/ListaAsistencia/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListaAsistencia(int id)
        {
            var listaAsistencia = await _context.ListasAsistencia.FindAsync(id);
            if (listaAsistencia == null)
            {
                return NotFound();
            }

            _context.ListasAsistencia.Remove(listaAsistencia);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListaAsistenciaExists(int id)
        {
            return _context.ListasAsistencia.Any(e => e.Numero == id);
        }
    }
}
