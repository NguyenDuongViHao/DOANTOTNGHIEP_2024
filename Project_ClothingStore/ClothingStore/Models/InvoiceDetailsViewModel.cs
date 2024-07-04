namespace ClothingStore.Models
{
	public class InvoiceDetailsViewModel
	{
		public int Id { get; set; }
		public double Price { get; set; }
		public int Quantity { get; set; }
		public double SubtotalProduct { get; set; }
		// invoice
		public int InvoiceId { get; set; }
		public string ApproveOrder { get; set; }
		//product
		public int ProductId{ get; set; }
		
		public string ProductName { get; set; }

		public string Image { get; set; }

		public string NameSize { get; set; }

		public string NameColor { get; set; }


	}
}
