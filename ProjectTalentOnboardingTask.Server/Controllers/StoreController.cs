using Microsoft.AspNetCore.Mvc;
using ProjectTalentOnboardingTask.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectTalentOnboardingTask.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StoreController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<StoreController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStores()
        {
            return await _context.Store.ToArrayAsync();
        }


        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(int id)
        {
            var store = await _context.Store.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return store;
        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(Store store)
        {
            _context.Store.Add(store);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStore), new { id = store.Id }, store);
        }

        // PUT api/<StoreController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, Store store)
        {
            if (id != store.Id)
            {
                return BadRequest();
            }

            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
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

        // DELETE api/<StoreController>/5
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteStore(int id)
        {
            var store = await _context.Store.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Store.Remove(store);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StoreExists(int id)
        {
            return _context.Store.Any(e => e.Id == id);
        }
    }
}

