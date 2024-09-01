using Microsoft.AspNetCore.Mvc;
using ProjectTalentOnboardingTask.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace ProjectTalentOnboardingTask.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        private readonly DBContext _context;

        public CustomerController(DBContext context)
        {
            _context = context;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersAsync()
        {
            try
            {
                return await _context.Customer.ToArrayAsync();
            }
            catch (Exception ex)
            {
                return BadRequest($"error in customers fetching {ex.Message}");
            }

        }


        // GET api/<CustomerController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomerAsync(int id)
        {

            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var customer = await _context.Customer.FindAsync(id);

                if (customer == null)
                {
                    return NotFound();
                }

                return customer;
            }
            catch (Exception ex)
            {
                return BadRequest($"error in customer fetching {ex.Message}");
            }

        }


        // POST api/<CustomerController>
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomerAsync(Customer customer)
        {
            try
            {
                _context.Customer.Add(customer);
                await _context.SaveChangesAsync();

                return customer;

            }
            catch (Exception ex)
            {
                return BadRequest($"error in customer saving {ex.Message}");
            }


        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerAsync(int id, Customer customer)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // DELETE api/<CustomerController>/5
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteCustomerAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var customer = await _context.Customer.FindAsync(id);
                if (customer == null)
                {
                    return NotFound();
                }

                _context.Customer.Remove(customer);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest($"error in customer deleting {ex.Message}");
            }
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }


        private bool HasValidId(int id)
        {
            return id > 0;
        }
    }
}