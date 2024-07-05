using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Data;
using ClothingStore.Models;
using Microsoft.CodeAnalysis;

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
            var product = await _context.Product
                .Include(p => p.Category)
                .FirstOrDefaultAsync(c=>c.Id==id);

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
            product.CreateTime = DateTime.Now;
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

            product.Status = false;
            _context.Product.Update(product);
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
                    Brand = product.Brand,
                    Origin = product.Origin,
                    CreateTime = time,
                    CategoryName = product.Category.Name,
					ImageName = image?.ImageURL,
					Status = product.Status,
                });
            }
			return Ok(rows);
		}
		//Get: api/Products/search? name = productname
		[HttpGet("searchProduct")]
		public async Task<ActionResult<IEnumerable<Product>>> SeacrhProducts(string name)
		{
			var query = _context.Product.AsQueryable();

			if (!string.IsNullOrEmpty(name))
			{
				query = query.Where(p => p.Name.Contains(name));
			}

			query = query.Where(p => p.Status);

			return await query.ToListAsync();
		}


		[HttpGet]
        [Route("productDetail/{id}")]
		public async Task<ActionResult<IEnumerable<Product>>> GetDetailOneProduct(int id)
		{
            var products = await _context.Product.Include(e => e.Category).FirstOrDefaultAsync(a => a.Id == id);
			var createTime = $"{products.CreateTime.Day}/{products.CreateTime.Month}/{products.CreateTime.Year}";
			List<Models.Image> images = await _context.Image.Where(i => i.ProductId == products.Id).ToListAsync();
			List<Models.ProductDetail> variant = await _context.ProductDetail.Include(a => a.Size).Include(a => a.Color).Where(i=> i.ProductId == products.Id).ToListAsync();
            List<Models.InvoiceDetail> invoiceDetails = await _context.InvoiceDetail.Include(i => i.ProductDetail).Include(a=> a.Invoice).ToListAsync();
            List<Models.Review> reviews1 = await _context.Review.Include(i => i.User).Include(a=> a.Product).Where(i => i.ProductId == products.Id).ToListAsync();

			if (products == null)
			{
				return NotFound();
            }
            var detailProducts = new ProductDetailViewModel {
                Id = products.Id,
                Name = products.Name,
                Description = products.Description,
                Price = products.Price,
                Brand = products.Brand,
                Origin = products.Origin,
                CreateTime = createTime,
                CategoryName = products.Category.Name,
                Images = images.Select(img => new ImageViewModel
                {
                    Id = img.Id,
                    FileName = img.ImageURL
                }).ToList(),
                Sizes = variant.GroupBy(s => s.Size.Id).Select(g => g.First().Size).Select(size => new Size
                {
                    Id  = size.Id,
                    NameSize = size.NameSize,
                    Status = size.Status,
                }).ToList(),
				Colors = variant.GroupBy(s => s.Color.Id).Select(g => g.First().Color).Select(color => new Color
				{
                    Id = color.Id,
					NameColor = color.NameColor,
                    Status = color.Status,
				}).ToList(),

				Reviews = reviews1.Select(r => new ReviewViewModel
				{
					Id = r.Id,
					UserName = r.User.FullName, 
					Content = r.Content,
					ReviewDate = r.ReviewDate.ToString("dd/MM/yyyy"),
					StarNumber = r.StarNumber,
				}).ToList()
			};

            return Ok(detailProducts);
		}

	}
}
