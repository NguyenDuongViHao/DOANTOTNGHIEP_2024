namespace ClothingStore.Models
{
	public class PaymentViewModel
	{
		public int Id { get; set; }

		public int ProductDetailId { get; set; }

		public string ProductName { get; set; }

		public int Quantity { get; set; }

		public string ImageURL { get; set; }

		public double Price { get; set; }

		public double PromotionPercentage { get; set; }

	}
}
