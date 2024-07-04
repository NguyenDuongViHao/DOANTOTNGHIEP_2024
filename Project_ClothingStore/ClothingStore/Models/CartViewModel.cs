namespace ClothingStore.Models
{
	public class CartViewModel
	{
		public int Id { get; set; }

		public string ProductName { get; set; }

		public int ProductDetailId { get; set; }

		public int Quantity { get; set; }

		public string ImageURL { get; set; }

		public double Price { get; set; }

		public double PromotionPercentage { get; set; }

		public string NameColor { get; set; }

		public string NameSize { get; set; }
	}
}
