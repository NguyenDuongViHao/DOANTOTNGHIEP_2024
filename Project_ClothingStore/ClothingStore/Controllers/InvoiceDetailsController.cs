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
    public class InvoiceDetailsController : ControllerBase
    {
        private readonly ClothingStoreContext _context;

        public InvoiceDetailsController(ClothingStoreContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceDetail>>> GetInvoiceDetail()
        {
            return await _context.InvoiceDetail.ToListAsync();
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDetail>> GetInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetail.FindAsync(id);

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return invoiceDetail;
        }

        // PUT: api/InvoiceDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail(int id, InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        // POST: api/InvoiceDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceDetail>> PostInvoiceDetail(InvoiceDetail invoiceDetail)
        {
            _context.InvoiceDetail.Add(invoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceDetail", new { id = invoiceDetail.Id }, invoiceDetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var invoiceDetail = await _context.InvoiceDetail.FindAsync(id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetail.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetail.Any(e => e.Id == id);
        }

		[HttpGet("infoOrder/{id}")]
		public async Task<ActionResult<InvoiceDetail>> GetInfoOrder(int id)
		{
            var timeInvoice = "";
			var infoOrder = await _context.InvoiceDetail
                .Include(i=>i.Invoice.User)
                .Include(i=>i.ProductDetail.Product)
				.Include(i => i.ProductDetail)
				.FirstOrDefaultAsync(a=> a.Invoice.Id == id);
			
			if (infoOrder == null)
			{
				return NotFound();
			}
			timeInvoice = $"{infoOrder.Invoice.IssueDate.Day}/{infoOrder.Invoice.IssueDate.Month}/{infoOrder.Invoice.IssueDate.Year}";
			
            var detailOrder = new InvoiceViewModel
			{
				Code = infoOrder.Invoice.Code,
				IssueDate = timeInvoice,
				UserName = infoOrder.Invoice.User.FullName,
				ShippingAddress = infoOrder.Invoice.ShippingAddress,
				ShippingPhone = infoOrder.Invoice.ShippingPhone,
                Discount = infoOrder.Invoice.Discount,   
                COD = infoOrder.Invoice.COD,

				Vnpay = infoOrder.Invoice.Vnpay,
                ApproveOrder = infoOrder.Invoice.ApproveOrder,
			};

            return Ok(detailOrder);
		}

		[HttpGet("detailsOfAnOrder/{id}")]
		public async Task<ActionResult<InvoiceDetail>> detailsOfAnOrder(int id)
		{
			var invoiceDetail = await _context.InvoiceDetail
					  .Include(i => i.ProductDetail.Product)
					  .Include(i => i.ProductDetail.Size)
					  .Include(i => i.ProductDetail.Color)
					  .Include(i => i.Invoice.User)
					  .Where(a => a.InvoiceId == id).ToListAsync();
			if (invoiceDetail == null)
			{
				return NotFound();
			}
			var listInvoiceDetails = new List<InvoiceDetailsViewModel>();
			foreach (InvoiceDetail item in invoiceDetail)
            {
				Models.Image image = _context.Image.FirstOrDefault(x => x.ProductId == item.ProductDetail.Product.Id);
                double totalOfProduct = (item.Quantity * item.Price);
                listInvoiceDetails.Add(new InvoiceDetailsViewModel
                {
                    Id = item.Id,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    SubtotalProduct = totalOfProduct,

                    InvoiceId = item.Invoice.Id,
                    ApproveOrder = item.Invoice.ApproveOrder,

                    ProductId = item.ProductDetail.Product.Id,
                    ProductName = item.ProductDetail.Product.Name,
                    Image = image?.ImageURL,
                    NameSize = item.ProductDetail.Size.NameSize,
                    NameColor = item.ProductDetail.Color.NameColor,
				});
			}

			return Ok(listInvoiceDetails);
		}
		[HttpGet("orderer/{id}")] // xuất thông tin chi tiết của người đặt hàng
		public async Task<ActionResult<InvoiceViewModel>> Orderer(int id)
		{
			var orderer = await _context.InvoiceDetail
				.Include(i => i.ProductDetail.Product)
				.Include(i => i.Invoice.User)
				.FirstOrDefaultAsync(a => a.InvoiceId == id);

			if (orderer == null)
			{
				Console.WriteLine($"Invoice with id {id} not found.");
				return NotFound();
			}

			var timeOrderer = $"{orderer.Invoice.IssueDate.Day}/{orderer.Invoice.IssueDate.Month}/{orderer.Invoice.IssueDate.Year}";

			var detailOrderer = new InvoiceViewModel
			{
				Code = orderer.Invoice.Code,
				IssueDate = timeOrderer,
				UserName = orderer.Invoice.User.FullName,
				ShippingAddress = orderer.Invoice.ShippingAddress,
				ShippingPhone = orderer.Invoice.ShippingPhone,
				Discount = orderer.Invoice.Discount,
				Total = orderer.Invoice.Total,
				ApproveOrder = orderer.Invoice.ApproveOrder,
				COD = orderer.Invoice.COD,

				Vnpay = orderer.Invoice.Vnpay,
			};

			return Ok(detailOrderer);
		}

	}

}

