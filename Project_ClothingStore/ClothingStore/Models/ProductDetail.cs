namespace ClothingStore.Models
{
	public class ProductDetail
	{
		public int Id { get; set; }

		public int Size_Id { get; set; }
		public Size Size { get; set; }

		public int Color_Id { get; set; }
		public Color Color { get; set; }

		public int Product_Id { get; set; }
		public Product Product { get; set; }

		public int Quantity { get; set; }

	}
}
