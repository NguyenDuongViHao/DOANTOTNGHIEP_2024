namespace ClothingStore.Models
{
	public class Image
	{
		public int Id { get; set; }

		public int Product_Id { get; set; }
		public Product Product { get; set; }

		public string ImageURL { get; set; }
	}
}