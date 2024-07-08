using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Data;
using ClothingStore.Models;
using ClothingStore.Helpers;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public FavouritesController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Favourites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favourite>>> GetFavourite()
        {
            return await _context.Favourite.ToListAsync();
        }

        // GET: api/Favourites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Favourite>> GetFavourite(int id)
        {
            var favourite = await _context.Favourite.FindAsync(id);

            if (favourite == null)
            {
                return NotFound();
            }

            return favourite;
        }

        // PUT: api/Favourites/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavourite(int id, Favourite favourite)
        {
            if (id != favourite.Id)
            {
                return BadRequest();
            }

            _context.Entry(favourite).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavouriteExists(id))
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

        // POST: api/Favourites
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Favourite>> PostFavourite(Favourite favourite)
        {
			var existingFavourite = await _context.Favourite
						 .FirstOrDefaultAsync(f => f.UserId == favourite.UserId && f.ProductId == favourite.ProductId);

			if (existingFavourite == null)
			{
				_context.Favourite.Add(favourite);
				await _context.SaveChangesAsync();

				return CreatedAtAction("GetFavourite", new { id = favourite.Id }, favourite);
			}
			else
			{
				_context.Favourite.Remove(existingFavourite);
				await _context.SaveChangesAsync();

				return Ok("Đã xóa yêu thích");
			}
		}

        // DELETE: api/Favourites/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int id)
        {
            var favourite = await _context.Favourite.FindAsync(id);
            if (favourite == null)
            {
                return NotFound();
            }

            _context.Favourite.Remove(favourite);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FavouriteExists(int id)
        {
            return _context.Favourite.Any(e => e.Id == id);
        }

		[HttpGet("listFavorite/{UserId}")]
		public async Task<ActionResult<List<FavouriteViewModel>>> FavouriteList(string UserId)
		{
			var favourites = await _context.Favourite
				.Include(i => i.Product)
				.Where(f => f.UserId == UserId).ToListAsync();
			var listFavourite = new List<FavouriteViewModel>();

			foreach (var favourite in favourites)
			{
				Models.Image image = await _context.Image.FirstOrDefaultAsync(x => x.ProductId == favourite.Product.Id);

				listFavourite.Add(new FavouriteViewModel
				{
					Id = favourite.Id,
					ProductId = favourite.Product.Id,
					NameProduct = favourite.Product?.Name,
					Price = favourite.Product.Price,
					ImageName = image?.ImageURL,
				});
			}
			return Ok(listFavourite);
		}

		[HttpGet("{userId}/{productId}")]
		public async Task<ActionResult<Favourite>> GetFavouriteUserBook(string userId, int productId)
		{
			var favourite = await _context.Favourite.FirstOrDefaultAsync(a => a.UserId == userId && a.ProductId == productId);

			if (favourite == null)
			{
				return NotFound();
			}
			return favourite;
		}
	}
}
