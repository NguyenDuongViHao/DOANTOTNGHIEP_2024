namespace ClothingStore.Models
{
	public class ProductFormData
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public double Price { get; set; }
		public int CategoryId { get; set; }
		public string Brand { get; set; }
		public string Origin { get; set; }
		public int SizeId { get; set; }
		public int ColorId { get; set; }
		public int Quantity { get; set; }
		public List<IFormFile> FileImages { get; set; } = new List<IFormFile>();
	}
}
