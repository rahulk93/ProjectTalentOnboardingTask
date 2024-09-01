using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTalentOnboardingTask.Server.Models;

namespace ProjectTalentOnboardingTask.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly DBContext _context;

        public SaleController(DBContext context)
        {
            _context = context;
        }

        // GET: api/<SaleController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSalesAsync()
        {
            try
            {
                return await _context.Sales
                                   .Include(s => s.Customer)
                                   .Include(s => s.Product)
                                   .Include(s => s.Store)
                                   .ToArrayAsync();
            }
            catch (Exception ex)
            {
                return BadRequest($"error in sales fetching {ex.Message}");
            }


        }


        // GET api/<SaleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSaleAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var sale = await _context.Sales.FindAsync(id);

                if (sale == null)
                {
                    return NotFound();
                }

                return sale;

            }
            catch (Exception ex)
            {
                return BadRequest($"error in sale fetching {ex.Message}");
            }


        }

        // POST api/<SaleController>
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSaleAsync(Sale sale)
        {
            try
            {
                _context.Sales.Add(sale);
                await _context.SaveChangesAsync();

                return sale;
            }
            catch (Exception ex)
            {
                return BadRequest($"error in sale saving {ex.Message}");
            }


        }

        // PUT api/<SaleController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleAsync(int id, Sale sale)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                if (id != sale.Id)
                {
                    return BadRequest();
                }

                _context.Entry(sale).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
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

        // DELETE api/<SaleController>/5
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteSaleAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var sale = await _context.Sales.FindAsync(id);
                if (sale == null)
                {
                    return NotFound();
                }

                _context.Sales.Remove(sale);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest($"error in sale deleting {ex.Message}");
            }


        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }

        private bool HasValidId(int id)
        {
            return id > 0;
        }

    }
}