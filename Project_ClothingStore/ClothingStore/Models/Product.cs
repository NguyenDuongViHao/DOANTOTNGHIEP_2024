namespace ClothingStore.Models
{
	public class Product
	{
		public int Id { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }	
		public string Name { get; set; }

		public string Description { get; set; }

		public double Price  { get; set; }

		public string Brand { get; set; }

		public string Origin { get; set; }

		public DateTime CreateTime { get; set; }

		public bool Status { get; set; }
	}
}
