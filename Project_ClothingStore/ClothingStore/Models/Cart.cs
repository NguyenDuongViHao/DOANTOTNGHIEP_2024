namespace ClothingStore.Models
{
	public class Cart
	{
		public int Id { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public int ProductDetailId { get; set;}
		public ProductDetail ProductDetail { get; set;}

		public int Quantity { get; set; }
	}
}
