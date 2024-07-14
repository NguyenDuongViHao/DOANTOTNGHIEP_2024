using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Data;
using ClothingStore.Models;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public CategoriesController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return await _context.Category.Where(c => c.Status)
                .ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }
		

		// PUT: api/Categories/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            category.Status = false;
            _context.Category.Update(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
		////Get: api/Products/search? name = productname
		//[HttpGet("searchCategories")]
		//public async Task<ActionResult<IEnumerable<Category>>> SeacrhCategories(string name)
		//{
		//	return await _context.Category
		//		  .Where(p => p.Name.Contains(name))
		//		  .ToListAsync();

		//}
		[HttpGet("searchCategories")]
		public async Task<ActionResult<IEnumerable<Category>>> SearchCategories(string name, bool status)
		{
			var query = _context.Category.AsQueryable();

			if (!string.IsNullOrEmpty(name))
			{
				query = query.Where(p => p.Name.Contains(name));
			}

			query = query.Where(p => p.Status);

			return await query.ToListAsync();
		}


		private bool CategoryExists(int id)
        {
            return _context.Category.Any(e => e.Id == id);
        }

        [HttpGet("ListCategory")]
		public async Task<ActionResult<IEnumerable<Category>>> GetListCategory()
		{
            var categoryy = await _context.Category.Where(c => c.Status)
				.ToListAsync();
			var products = await _context.Product.Include(e => e.Category).Where(a => a.Status).ToListAsync();
			var rows = new List<CategoryViewModel>();
            foreach (var item in categoryy) {
				var product = products.FirstOrDefault(p => p.Category.Id == item.Id);
				Models.Image image = await _context.Image.FirstOrDefaultAsync(i => i.ProductId == product.Id);
				rows.Add(new CategoryViewModel
				{
					Id = item.Id,
					Name = item.Name,
					Image = image.ImageURL,
					Status = item.Status,
				});
			}
				
				return Ok(rows);
		}
	}
}
