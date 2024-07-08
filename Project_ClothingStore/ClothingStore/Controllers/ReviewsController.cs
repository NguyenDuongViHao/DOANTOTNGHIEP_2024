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
    public class ReviewsController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public ReviewsController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewViewModel>>> GetReview()
        {
			var oneStars = _context.Review.Count(rev => rev.StarNumber == 1);
			var twoStars = _context.Review.Count(rev => rev.StarNumber == 2);
			var threeStars = _context.Review.Count(rev => rev.StarNumber == 3);
			var fourStars = _context.Review.Count(rev => rev.StarNumber == 4);
			var fiveStars = _context.Review.Count(rev => rev.StarNumber == 5);
			var totalStars = _context.Review.Sum(rev => rev.StarNumber);
			var averageRating = _context.Review.Average(rev => rev.StarNumber);

			var reviews = _context.Review
               .Include(r => r.User)
               .Include(r => r.Product)
               .Select(r => new ReviewViewModel
               {
                   Id = r.Id,
                   UserName = r.User.UserName,
                   Content = r.Content,
                   ReviewDate = r.ReviewDate.ToString("yyyy-MM-dd"),
                   StarNumber = r.StarNumber,
                   oneStars = oneStars,
                   twoStars = twoStars,
                   threeStars = threeStars,
                    fourStars = fourStars,
                    fiveStars = fiveStars,
                    totalStars = totalStars,
                    averageRating = averageRating,
               }).ToList();
            return Ok(reviews);
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            var review = await _context.Review.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Review.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Review.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Review.Any(e => e.Id == id);
        }

		[HttpGet]
        [Route("detailReview/{id}")]
		public async Task<ActionResult<IEnumerable<Review>>> GetListReview(int id)
		{
            var listReview = await _context.Review.Include(r => r.User).Include(r=> r.Product).Where(r => r.ProductId == id).ToListAsync();
			var oneStars = listReview.Count(r => r.StarNumber == 1);
			var twoStars = listReview.Count(r => r.StarNumber == 2);
			var threeStars = listReview.Count(r => r.StarNumber == 3);
			var fourStars = listReview.Count(r => r.StarNumber == 4);
			var fiveStars = listReview.Count(r => r.StarNumber == 5);

			var totalReviews = listReview.Count();
			var totalStars = (oneStars * 1) + (twoStars * 2) + (threeStars * 3) + (fourStars * 4) + (fiveStars * 5);

			var averageRating = totalReviews == 0 ? 0 : Math.Round((double)totalStars / totalReviews, 1); // Làm tròn đến 1 chữ số thập phân
			var reviewSummary = new ReviewViewModel
			{
		        oneStars = oneStars,
                twoStars = twoStars,
                threeStars = threeStars,
                fourStars = fourStars,
                fiveStars = fiveStars,
                totalStars = totalReviews,
                averageRating = averageRating,
			};

			return Ok(reviewSummary);
		}
	}
}
