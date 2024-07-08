using ClothingStore.Data;
using ClothingStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClothingStore.Controllers
{
	[Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public InvoicesController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoice()
        {
            return await _context.Invoice.Include(u => u.User)
				.ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoice.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoice.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.Id == id);
        }

		[HttpGet]
        [Route("UserListOfOrder/{str}/{UserId}")]
		public async Task<ActionResult<IEnumerable<Invoice>>> UserListOfOrder(string str, string UserId)
		{
            var invoices = await _context.Invoice.ToListAsync();
			//var UserId = User.GetUserId().ToString();

			if(UserId != null)
            {
				invoices = await _context.Invoice.Include(i => i.User)
				.Where(i => str == "default" ? true
				: str == "ordered" ? i.ApproveOrder == "Chờ xử lý"
				: str == "confirmed" ? i.ApproveOrder == "Đã xác nhận"
				: str == "delivered" ? i.ApproveOrder == "Đã giao"
				: str == "canceled" ? i.ApproveOrder == "Đã hủy" : true).Where(i => i.UserId == UserId).OrderByDescending(i => i.Id).ToListAsync();
			}
            var invoiceDetails = await _context.InvoiceDetail.Include(i=> i.Invoice)
                                                            .Include(i=>i.ProductDetail)
                                                                .ThenInclude(i=>i.Product).ToListAsync();
			var listOfOrder = new List<InvoiceViewModel>();
			foreach (var invoice in invoices)
            {
                string nameProduct = "";
                string timeOrder = "";
                int productid=0;
			    timeOrder = $"{invoice.IssueDate.Day}/{invoice.IssueDate.Month}/{invoice.IssueDate.Year}";
				List<string> templist = new List<string>();

                foreach (var invoicedetail in invoiceDetails)
                {
                    if(invoicedetail.Invoice.Id == invoice.Id)
                    {
                        productid = invoicedetail.ProductDetail.Product.Id;
                        templist.Add(invoicedetail.ProductDetail.Product.Name);
                    }
                }

                nameProduct = string.Join(", ", templist);
                listOfOrder.Add(new InvoiceViewModel
                {
                    Id = invoice.Id,
                    Code = invoice.Code,
                    IssueDate = timeOrder,
                    ShippingAddress = invoice.ShippingAddress,
                    ShippingPhone = invoice.ShippingPhone,
                    Total = invoice.Total,
                    ApproveOrder = invoice.ApproveOrder,
                    NameProduct = nameProduct,
                    ProductId = productid,
                    Status = invoice.Status,
                });
            }

			return Ok(listOfOrder);
		}
		//[HttpDelete("AdminConfirmOrder/{id}")]
		//public async Task<IActionResult> ConfirmOrder(int id)
		//{
		//	var invoice = await _context.Invoice.FindAsync(id);
		//	if (invoice == null)
		//	{
		//		return NotFound();
		//	}

		//	invoice.ApproveOrder = "Đã xác nhận"; // or whatever field you use to confirm the order
		//	_context.Invoice.Update(invoice);
		//	await _context.SaveChangesAsync();

		//	return Ok(invoice);
		//}
		[HttpDelete("AdminConfirmOrder/{id}")]
		public async Task<IActionResult> ConfirmOrder(int id)
		{
			var invoice = await _context.Invoice.FindAsync(id);
			if (invoice == null)
			{
				return NotFound();
			}

			// Cập nhật trạng thái đã xác nhận
			invoice.ApproveOrder = "Đã xác nhận"; // Hoặc trường tương ứng bạn sử dụng để xác nhận đơn hàng
												  // Cập nhật trạng thái đã giao
			invoice.Status = true; // Đánh dấu đơn hàng đã giao là true

			_context.Invoice.Update(invoice);
			await _context.SaveChangesAsync();

			return Ok(invoice);
		}

		[HttpDelete("AdminTransport/{id}")]
		public async Task<IActionResult> AdminTransport(int id)
		{
			var invoice = await _context.Invoice.FindAsync(id);

			if (invoice == null)
			{
				return NotFound();
			}

			invoice.ApproveOrder = "Đã giao";
			_context.Invoice.Update(invoice);
			await _context.SaveChangesAsync();

			return NoContent();
		}
		[HttpDelete("UpdateQuantityOrder/{id}")]
		public async Task<IActionResult> Canceled(int id)
		{
			var invoice = await _context.Invoice.FindAsync(id);
			var productDetails = await _context.ProductDetail.ToListAsync();
			var invoice_Detail = await _context.InvoiceDetail
					  .Include(i => i.ProductDetail)
					  .Include(i => i.Invoice)
					  .Where(a => a.InvoiceId == id).ToListAsync();

			if (invoice == null)
			{
				return NotFound();
			}

			foreach (InvoiceDetail details in invoice_Detail)
			{
				var productDetail = productDetails.FirstOrDefault(p => p.Id == details.ProductDetailId);
				if (productDetail != null)
				{
					productDetail.Quantity += details.Quantity;
					_context.ProductDetail.Update(productDetail);
					await _context.SaveChangesAsync();
				}
			}

			invoice.Status = false;
			_context.Invoice.Update(invoice);
			await _context.SaveChangesAsync();
			return NoContent();
		}


		[HttpGet("ListOfOrder/{str}")]
		public async Task<ActionResult<IEnumerable<InvoiceViewModel>>> ListOfOrderAdmin(string str)
		{
			var invoices = await _context.Invoice
				.Include(i => i.User)
				.Where(i => str == "default" ? true
						 : str == "approveOrder" ? i.ApproveOrder == "Chờ xử lý"
						 : str == "confirmed" ? i.ApproveOrder == "Đã xác nhận"
						 : str == "delivered" ? i.ApproveOrder == "Đã giao"
						 : str == "canceled" ? i.ApproveOrder == "Đã hủy"
						 : i.ApproveOrder == "Đã đặt")
				.ToListAsync();

			var listInvoices = new List<InvoiceViewModel>();
			foreach (var invoice in invoices)
			{
				var totalQuantity = 0;
				var productNameList = new List<string>();
				var issuedDate = $"{invoice.IssueDate.Day}/{invoice.IssueDate.Month}/{invoice.IssueDate.Year}";

				var detailInvoices = await _context.InvoiceDetail
					.Include(pd => pd.ProductDetail)
					.Include(pd => pd.ProductDetail.Product)
					//.Where(pd => pd.ProductDetailId == invoice.Id)
					.ToListAsync();
				foreach (var detail in detailInvoices)
				{
					totalQuantity += detail.Quantity;
					productNameList.Add(detail.ProductDetail.Product.Name);
				}

				var productList = string.Join(", ", productNameList);

				listInvoices.Add(new InvoiceViewModel
				{
					Id = invoice.Id,
					UserName = invoice.User.UserName,
					IssueDate = issuedDate,
					Code = invoice.Code,
					ShippingAddress = invoice.ShippingAddress,
					ShippingPhone = invoice.ShippingPhone,
                    Discount = invoice.Discount,
					Total = invoice.Total,
					TotalQuantity = totalQuantity,
					ApproveOrder = invoice.ApproveOrder,
					COD = invoice.COD,
					MoMo = invoice.MoMo,
					NameProduct = productList,
					Status = invoice.Status
				});
			}

			return Ok(listInvoices);
		}
		[HttpGet("totalcount")]
		public async Task<ActionResult<int>> GetTotalInvoiceCount()
		{
			var totalCount = await _context.Invoice.CountAsync();
			return Ok(totalCount);
		}
		[HttpGet("totalrevenue")]
		public async Task<ActionResult<double>> GetTotalRevenue()
		{
			try
			{
				var totalRevenue = await _context.Invoice
					.SumAsync(i => i.Total);

				return Ok(totalRevenue);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Lỗi: {ex.Message}");
			}
		}
		[HttpGet("pendingcount")]
		public async Task<ActionResult<int>> GetPendingOrderCount()
		{
			try
			{
				// In tất cả đơn hàng ra console để kiểm tra giá trị
				var allOrders = await _context.Invoice.ToListAsync();
				foreach (var order in allOrders)
				{
					Console.WriteLine($"OrderId: {order.Id}, ApproveOrder: {order.ApproveOrder}, Status: {order.Status}");
				}

				// Kiểm tra điều kiện ApproveOrder == "Chờ xử lý"
				var notApprovedOrders = await _context.Invoice
					.Where(order => order.ApproveOrder == "Chờ xử lý")
					.ToListAsync();
				Console.WriteLine($"Count of orders not approved: {notApprovedOrders.Count}");

				// Kiểm tra điều kiện Status = false
				var notDeliveredOrders = await _context.Invoice
					.Where(order => !order.Status)
					.ToListAsync();
				Console.WriteLine($"Count of orders not delivered: {notDeliveredOrders.Count}");

				// Kết hợp cả hai điều kiện
				var pendingOrders = await _context.Invoice
					.Where(order => order.ApproveOrder == "Chờ xử lý" && !order.Status)
					.ToListAsync();
				Console.WriteLine($"Pending orders count: {pendingOrders.Count}");

				return Ok(pendingOrders.Count);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
			}
		}
		[HttpGet("latest")]
		public async Task<ActionResult<IEnumerable<Invoice>>> GetLatestInvoices()
		{
			var latestInvoices = await _context.Invoice
				.Include(i => i.User)
				.Where(i => i.Status) // Filter for invoices with Status == true (delivered)
				.OrderByDescending(i => i.IssueDate) // Order by IssueDate descending to get the latest first
				.Take(7) // Take the latest 7 invoices
				.ToListAsync();

			return Ok(latestInvoices);
		}

		// GET: api/users/membercount
		[HttpGet("membercount")]
		public async Task<ActionResult<int>> GetMemberCount()
		{
			try
			{
				var memberCount = await _context.Users.CountAsync();
				return Ok(memberCount);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
			}
		}
		// GET: api/Invoices/MonthlyRevenue?year=2024
		[HttpGet("MonthlyRevenue")]
		public async Task<ActionResult<IEnumerable<object>>> GetMonthlyRevenue(int year)
		{
			var monthlyData = await _context.Invoice
				.Where(i => i.IssueDate.Year == year)
				.GroupBy(i => i.IssueDate.Month)
				.Select(g => new
				{
					Month = g.Key,
					TotalRevenue = g.Sum(i => i.Total)
				})
				.OrderBy(g => g.Month)
				.ToListAsync();

			return Ok(monthlyData);
		}
		[HttpGet("AvailableYears")]
		public async Task<ActionResult<IEnumerable<int>>> GetAvailableYears()
		{
			var years = await _context.Invoice
				.Select(i => i.IssueDate.Year)
				.Distinct()
				.ToListAsync();

			return Ok(years);
		}


	}
}
