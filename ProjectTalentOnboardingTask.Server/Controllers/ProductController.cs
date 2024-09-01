using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTalentOnboardingTask.Server.Models;

namespace ProjectTalentOnboardingTask.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly DBContext _context;

        public ProductController(DBContext context)
        {
            _context = context;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsAsync()
        {
            try
            {
                return await _context.Product.ToArrayAsync();
            }
            catch (Exception ex)
            {
                return BadRequest($"error in products fetching {ex.Message}");
            }

        }


        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var product = await _context.Product.FindAsync(id);

                if (product == null)
                {
                    return NotFound();
                }

                return product;
            }
            catch (Exception ex)
            {
                return BadRequest($"error in product fetching {ex.Message}");
            }



        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<ActionResult<Product>> PostProductAsync(Product product)
        {
            try
            {
                _context.Product.Add(product);
                await _context.SaveChangesAsync();

                return product;

            }
            catch (Exception ex)
            {
                return BadRequest($"error in product saving {ex.Message}");
            }

        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductAsync(int id, Product product)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                if (id != product.Id)
                {
                    return BadRequest();
                }

                _context.Entry(product).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var product = await _context.Product.FindAsync(id);
                if (product == null)
                {
                    return NotFound();
                }

                _context.Product.Remove(product);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest($"error in product deleting {ex.Message}");
            }



        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }

        private bool HasValidId(int id)
        {
            return id > 0;
        }

    }
}