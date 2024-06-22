namespace ClothingStore.Models
{
	public class Cart
	{
		public int Id { get; set; }

		public string User_Id { get; set; }
		public User User { get; set; }

		public int ProductDetail_Id { get; set;}
		public ProductDetail ProductDetail { get; set;}

		public int Quantity { get; set; }
	}
}
