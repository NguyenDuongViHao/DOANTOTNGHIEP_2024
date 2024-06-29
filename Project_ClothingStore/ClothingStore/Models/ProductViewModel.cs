namespace ClothingStore.Models
{
	public class ProductViewModel
	{
		public int Id { get; set; }
		public string CategoryName{ get; set; }
		public Category Category { get; set; }
		public string Name { get; set; }

		public string Description { get; set; }

		public double Price { get; set; }

		public string Brand { get; set; }

		public string Origin { get; set; }

		public string CreateTime { get; set; }

		public string ImageName { get; set; }

		public List<ImageViewModel> Images { get; set; }

		public bool Status { get; set; }
	}
}
