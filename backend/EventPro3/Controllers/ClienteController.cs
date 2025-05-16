using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventPro3.Data;
using EventPro3.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace EventPro3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly EventProContext _context;
        private readonly ILogger<ClienteController> _logger;

        public ClienteController(EventProContext context, ILogger<ClienteController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            var clientes = await _context.Clientes
                .Include(c => c.MunicipioNavigation)
                .Include(c => c.Eventos)
                .ToListAsync();

            clientes.ForEach(cliente => cliente.MunicipioNavigation?.Clientes.Clear());

            return clientes;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Clientes
                .Include(c => c.MunicipioNavigation)
                .Include(c => c.Eventos)
                .FirstOrDefaultAsync(c => c.Numero == id);

            if (cliente == null)
            {
                return NotFound();
            }

            cliente.MunicipioNavigation?.Clientes.Clear();

            return cliente;
        }

        // POST: api/cliente
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.Numero }, cliente);
        }

        // PUT: api/cliente/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.Numero)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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

        // DELETE: api/cliente/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var cliente = await _context.Clientes.Include(c => c.Eventos).FirstOrDefaultAsync(c => c.Numero == id);
                if (cliente == null)
                {
                    return NotFound();
                }

                _context.Eventos.RemoveRange(cliente.Eventos);
                _context.Clientes.Remove(cliente);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Error al eliminar el cliente con id {Id}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        // POST: api/cliente/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(Cliente cliente)
        {
            if (_context.Clientes.Any(c => c.Correo == cliente.Correo))
            {
                return BadRequest("El correo ya está en uso.");
            }

            cliente.Password = BCrypt.Net.BCrypt.HashPassword(cliente.Password);
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.Numero }, cliente);
        }

        // POST: api/cliente/signin
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
        {
            var cliente = await _context.Clientes
                .Include(c => c.MunicipioNavigation)
                .Include(c => c.Eventos)
                .SingleOrDefaultAsync(c => c.Correo == request.Correo);

            if (cliente == null || !BCrypt.Net.BCrypt.Verify(request.Password, cliente.Password))
            {
                return Unauthorized("Correo o contraseña incorrectos.");
            }

            return Ok(new
            {
                cliente.Numero,
                cliente.Nombre,
                cliente.DirCalle,
                cliente.DirNum,
                cliente.DirColonia,
                cliente.NumTel,
                cliente.Correo,
                cliente.Password,
                cliente.MunicipioId,
                cliente.MunicipioNavigation,
                cliente.Eventos,
            });
        }

        public class SignInRequest
        {
            public string Correo { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        private bool ClienteExists(int id)
        {
            return _context.Clientes.Any(e => e.Numero == id);
        }
    }
}
