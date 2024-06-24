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
    public class ProductsController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public ProductsController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _context.Product.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Product.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
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

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("listProduct")]
		public async Task<ActionResult<IEnumerable<Product>>> GetListProduct()
		{
			var products = await _context.Product.Include(e => e.Category).Where(a=> a.Status).ToListAsync();
            var rows = new List<ProductViewModel>();
            foreach (var product in products) {
				var chuoi = "";
				var ngay = "";
				var thang = "";
				var nam = "";
				var time = "";
				ngay = ngay + product.CreateTime.Day;
				thang = thang + product.CreateTime.Month;
				nam = nam + product.CreateTime.Year;
				time = ngay + "/" + thang + "/" + nam;
				Models.Image image = await _context.Image.FirstOrDefaultAsync(i => i.ProductId == product.Id);
                rows.Add(new ProductViewModel
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    CreateTime = time,
                    CategoryName = product.Category.Name,
					ImageName = image?.ImageURL,
					Status = product.Status,
                });
            }
			return Ok(rows);
		}

        [HttpGet]
        [Route("productDetail")]
		public async Task<ActionResult<IEnumerable<Product>>> GetDetailOneProduct()
		{
			return Ok();
		}

	}
}
