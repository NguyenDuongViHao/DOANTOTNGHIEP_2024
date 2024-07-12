using CodeMegaVNPay.Models;
using CodeMegaVNPay.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClothingStore.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PaymentController : ControllerBase
	{
		private readonly IVnPayService _vnPayService;

		public PaymentController(IVnPayService vnPayService)
		{
			_vnPayService = vnPayService;
		}

		[HttpPost("CreatePaymentUrl")]
		public IActionResult CreatePaymentUrl(PaymentInformationModel model)
		{
			var url = _vnPayService.CreatePaymentUrl(model, HttpContext);
			//return Ok(new { paymentUrl = url });
			return Ok(url);
		}

		[HttpGet("PaymentCallback")]
		public IActionResult PaymentCallback()
		{
			var response = _vnPayService.PaymentExecute(Request.Query);
			return Ok(response);
		}
	}
}
