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
    public class ImagesController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public ImagesController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImage()
        {
            return await _context.Image.ToListAsync();
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Image.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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

		// POST: api/Images
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<Image>> PostImage([FromForm] Image image)
		{
			if (image.FileImage != null && image.FileImage.Length > 0)
			{
				// Tạo đường dẫn để lưu trữ tệp hình ảnh
				var filePath = Path.Combine("wwwroot/images", image.ImageURL);

				// Sử dụng FileStream để ghi dữ liệu tệp vào vị trí lưu trữ
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					await image.FileImage.CopyToAsync(stream);
				}
			}
			// Thêm thông tin hình ảnh vào DbSet và lưu vào cơ sở dữ liệu
			_context.Image.Add(image);
			await _context.SaveChangesAsync();
			// Trả về phản hồi 201 (Created) với liên kết đến phương thức GetImage
			return CreatedAtAction("GetImage", new { id = image.Id }, image);
		}

		// DELETE: api/Images/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Image.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Image.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageExists(int id)
        {
            return _context.Image.Any(e => e.Id == id);
        }
    }
}
