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
using System.Drawing;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public CartsController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            return await _context.Cart.Include(c=>c.User).Include(c=> c.ProductDetail).ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            _context.Cart.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Cart.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Cart.Any(e => e.Id == id);
        }

		[HttpPost]
        [Route("createCart")]
		public async Task<ActionResult<Cart>> PostCreateCart(Cart cart)
		{
			//var userId = User.GetUserId().ToString();
			var existInCart = _context.Cart.SingleOrDefault(c => c.ProductDetailId == cart.ProductDetailId && c.UserId == cart.UserId);
            if (existInCart != null) {
                existInCart.Quantity += cart.Quantity;
                _context.Entry(existInCart).State = EntityState.Modified;
            }
            else
            {
               
                _context.Cart.Add(cart);

			}
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
		}

		[HttpGet]
        [Route("listCart/{UserId}")]
		public async Task<ActionResult<IEnumerable<Cart>>> GetListCart(string UserId)
		{
			//var userId = User.GetUserId().ToString();
			var carts = await _context.Cart.Include(a => a.User)
											.Include(c => c.ProductDetail)
								                .ThenInclude(pd => pd.Product)
							                .Include(c => c.ProductDetail)
								                .ThenInclude(pd => pd.Color)
							                .Include(c => c.ProductDetail)
								                .ThenInclude(pd => pd.Size)
											.Where(c => c.UserId == UserId && c.Selected == false)
											.ToListAsync();
			
			var rows = new List<CartViewModel>();
            foreach (var cart in carts)
            {
                Models.Image image = await _context.Image.FirstOrDefaultAsync(i => i.ProductId == cart.ProductDetail.ProductId);
				rows.Add(new CartViewModel
				{
					Id = cart.Id,
					ProductDetailId = cart.ProductDetailId,
					ProductName = cart.ProductDetail.Product.Name,
					Quantity = cart.Quantity,
                    ImageURL = image?.ImageURL,
					Price = cart.ProductDetail.Product.Price,
					PromotionPercentage = 0,
                    NameColor = cart.ProductDetail.Color.NameColor,
                    NameSize = cart.ProductDetail.Size.NameSize,
				});
			}
			return Ok(rows);
		}

		[HttpGet]
		[Route("listPayment/{userId}")]
		public async Task<ActionResult<IEnumerable<Cart>>> GetListPayment(string userId)
		{
            var listCart = await _context.Cart.Include(i => i.User)
												.Include(c => c.ProductDetail)
												.ThenInclude(pd => pd.Product)
											.Include(c => c.ProductDetail)
												.ThenInclude(pd => pd.Color)
											.Include(c => c.ProductDetail)
												.ThenInclude(pd => pd.Size)
											.Where(c => c.UserId == userId && c.Selected).ToArrayAsync();

			var rows = new List<PaymentViewModel>();
			foreach (var cart in listCart)
			{
				Models.Image image = await _context.Image.FirstOrDefaultAsync(i => i.ProductId == cart.ProductDetail.ProductId);
				rows.Add(new PaymentViewModel
				{
					Id = cart.Id,
					ProductDetailId = cart.ProductDetailId,
					ProductName = cart.ProductDetail.Product.Name,
					Quantity = cart.Quantity,
					ImageURL = image?.ImageURL,
					Price = cart.ProductDetail.Product.Price,
					PromotionPercentage = 0,
				});
			}

			return Ok(rows);
		}

		[HttpPut("updateSelected")]
		public async Task<IActionResult> UpdateSelected(List<Cart> carts)
		{
			if (carts == null || !carts.Any())
			{
				return BadRequest("No cart items provided.");
			}

			foreach (var cart in carts)
			{
				var existingCart = await _context.Cart
	                        .FirstOrDefaultAsync(c => c.Id == cart.Id && c.UserId == cart.UserId);
				if (existingCart == null)
				{
					return NotFound($"Cart with ID {cart.Id} not found.");
				}

				existingCart.Selected = cart.Selected;
			}

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException ex)
			{
				foreach (var cart in carts)
				{
					if (!CartExists(cart.Id))
					{
						return NotFound($"Cart with ID {cart.Id} no longer exists.");
					}
				}
				throw;
			}

			return NoContent();
		}

		[HttpPut("updateSelectedWhenBackToCart/{userId}")]
		public async Task<IActionResult> UpdateSelectedWhenBackToCart(string userId)
		{
			var carts = await _context.Cart.ToListAsync();

			foreach (var cart in carts)
			{
				var existingCart = await _context.Cart
						.FirstOrDefaultAsync(c => c.UserId == userId && c.Selected);
				if (existingCart == null)
				{
					return NotFound($"Cart with ID {cart.Id} not found.");
				}

				existingCart.Selected = false; // Cập nhật selected về false khi quay lại trang cart
			}

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException ex)
			{
				foreach (var cart in carts)
				{
					if (!CartExists(cart.Id))
					{
						return NotFound($"Cart with ID {cart.Id} no longer exists.");
					}
				}
				throw;
			}

			return NoContent();
		}

		[HttpPut("updateQuantityCart")]
		public async Task<IActionResult> UpdateQuantityCart([FromBody] Cart request)
		{
			if (request == null)
			{
				return BadRequest("Invalid request data");
			}

			var cartItem = await _context.Cart.FirstOrDefaultAsync(c => c.Id == request.Id && c.UserId == request.UserId);

			if (cartItem == null)
			{
				return NotFound($"Cart item with ID {request.Id} not found for user {request.UserId}");
			}
			cartItem.Quantity = request.Quantity;
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException ex)
			{
				if (!CartExists(request.Id))
				{
					return NotFound($"Cart item with ID {request.Id} no longer exists.");
				}
				throw;
			}
			return NoContent();
		}

		[HttpPost]
		[Route("pay/{UserId}")]
		public async Task<ActionResult<Cart>> PostPayment(string UserId, [FromBody] Invoice invoiceRequest)
		{
			//var UserId = User.GetUserId().ToString();
			if (UserId != null)
			{
				var cartOfUser = await _context.Cart
					.Include(c => c.User)
					.Include(c => c.ProductDetail.Product)
					.Where(i => i.UserId == UserId).ToListAsync();
				var codeOrder = DateTime.Now.ToString("yyMMddhhmmss");
				Invoice invoice = new Invoice()
				{
					Code = codeOrder,
					UserId = UserId,
					IssueDate = DateTime.Now,
					ShippingAddress = invoiceRequest.ShippingAddress,
					ShippingPhone = invoiceRequest.ShippingPhone,
					Discount = invoiceRequest.Discount,
					Total = invoiceRequest.Total,
					ApproveOrder = "Chờ xử lý",
					COD = invoiceRequest.COD,
					Vnpay = invoiceRequest.Vnpay,
					Status = false,
				};
				_context.Invoice.Add(invoice);
				await _context.SaveChangesAsync();
				foreach (Cart item in cartOfUser)
				{
					InvoiceDetail indetail = new InvoiceDetail()
					{
						InvoiceId = invoice.Id,
						ProductDetailId = item.ProductDetailId,
						Quantity = item.Quantity,
						Price = item.ProductDetail.Product.Price,
					};
					item.ProductDetail.Quantity -= item.Quantity;
					_context.InvoiceDetail.Add(indetail);
					_context.ProductDetail.Update(item.ProductDetail);
					_context.Cart.Remove(item);
				}
				await _context.SaveChangesAsync();
				return Ok(new { CodeOnline = codeOrder });
			}
			return BadRequest("UserId is null");
		}

		[HttpGet("cartcount/{userId}")]
		public async Task<IActionResult> GetCartCount(string userId)
		{
			var cartCount = await _context.Cart.Where(u => u.UserId== userId).CountAsync();
			return Ok(cartCount);
		}
			
	}
}  
