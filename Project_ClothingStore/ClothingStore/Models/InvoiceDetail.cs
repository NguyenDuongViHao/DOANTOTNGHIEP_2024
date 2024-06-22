namespace ClothingStore.Models
{
	public class InvoiceDetail
	{
		public int Id { get; set; }

		public int Invoice_Id { get; set; }
		public Invoice Invoice { get; set; }

		public int ProductDetail_Id { get;}
		public ProductDetail ProductDetail { get; set; }
		public double Price { get; set; }

		public int Quantity { get;}

	}
}
