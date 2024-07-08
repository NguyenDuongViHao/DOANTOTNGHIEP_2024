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
    public class ProductDetailsController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public ProductDetailsController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/ProductDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetail>>> GetProductDetail()
        {
            return await _context.ProductDetail.ToListAsync();
        }

        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetail>> GetProductDetail(int id)
        {
            var productDetail = await _context.ProductDetail.Include(d => d.Size)
                .Include(d=>d.Color)
                .Include(d => d.Product)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (productDetail == null)
            {
                return NotFound();
            }

            return productDetail;
        }

		// PUT: api/ProductDetails/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

		[HttpPut("{id}")]
		public async Task<IActionResult> PutBook(int id, ProductDetail productDetail)
		{
			if (id != productDetail.Id)
			{
				return BadRequest();
			}

			_context.Entry(productDetail).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ProductDetailExists(id))
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

		private bool ProductDetailExists(int id)
		{
			return _context.ProductDetail.Any(e => e.Id == id);
		}


		// POST: api/ProductDetails
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<ProductDetail>> PostProductDetail(ProductDetail productDetail)
		{
			try
			{
				if (productDetail == null)
				{
					return BadRequest("ProductDetail is null.");
				}

				_context.ProductDetail.Add(productDetail);
				await _context.SaveChangesAsync();

				return CreatedAtAction(nameof(GetProductDetail), new { id = productDetail.Id }, productDetail);
			}
			catch (Exception ex)
			{
				// Log the exception details
				Console.WriteLine($"Error: {ex.Message}");
				Console.WriteLine($"Stack Trace: {ex.StackTrace}");

				// Return a 500 error with the exception message for debugging
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}


		// DELETE: api/ProductDetails/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductDetail(int id)
        {
            var productDetail = await _context.ProductDetail.FindAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }

            _context.ProductDetail.Remove(productDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
		[HttpGet("listProductDetail/{id}")]
		public async Task<ActionResult<List<ProductDetail>>> GetProductDetailAdmin(int id)
		{
			var productDetails = await _context.ProductDetail.Include(d => d.Size)
				.Include(d => d.Color)
				.Include(d => d.Product)
				.Where(d => d.ProductId == id).ToListAsync();

			if (productDetails == null || productDetails.Count == 0)
			{
				// Ghi log thông tin chi tiết về lỗi
				Console.WriteLine($"Không tìm thấy chi tiết sản phẩm với ProductId = {id}");
				return NotFound("Không tìm thấy chi tiết sản phẩm.");
			}

			return productDetails;
		}



	}
}
