using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTalentOnboardingTask.Server.Models;

namespace ProjectTalentOnboardingTask.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly DBContext _context;

        public StoreController(DBContext context)
        {
            _context = context;
        }

        // GET: api/<StoreController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoresAsync()
        {
            try
            {
                return await _context.Store.ToArrayAsync();
            }
            catch (Exception ex)
            {
                return BadRequest($"error in stores fetching {ex.Message}");
            }

        }

        // GET api/<StoreController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStoreAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                var store = await _context.Store.FindAsync(id);

                if (store == null)
                {
                    return NotFound();
                }

                return store;

            }
            catch (Exception ex)
            {
                return BadRequest($"error in store fetching {ex.Message}");
            }


        }

        // POST api/<StoreController>
        [HttpPost]
        public async Task<ActionResult<Store>> PostStoreAsync(Store store)
        {
            try
            {
                _context.Store.Add(store);
                await _context.SaveChangesAsync();

                return store;
            }
            catch (Exception ex)
            {
                return BadRequest($"error in store saving {ex.Message}");
            }


        }

        // PUT api/<StoreController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoreAsync(int id, Store store)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
            {
                if (id != store.Id)
                {
                    return BadRequest();
                }

                _context.Entry(store).State = EntityState.Modified;

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

        public async Task<IActionResult> DeleteStoreAsync(int id)
        {
            if (!HasValidId(id))
            {
                return BadRequest("Invalid ID");
            }

            try
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
            catch (Exception ex)
            {
                return BadRequest($"error in store deleting {ex.Message}");
            }


        }

        private bool StoreExists(int id)
        {
            return _context.Store.Any(e => e.Id == id);
        }

        private bool HasValidId(int id)
        {
            return id > 0;
        }
    }
}

