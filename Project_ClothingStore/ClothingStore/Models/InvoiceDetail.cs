namespace ClothingStore.Models
{
	public class InvoiceDetail
	{
		public int Id { get; set; }

		public int InvoiceId { get; set; }
		public Invoice Invoice { get; set; }

		public int ProductDetailId { get; set; }
		public ProductDetail ProductDetail { get; set; }
		public double Price { get; set; }

		public int Quantity { get; set; }

	}
}
