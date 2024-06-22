namespace ClothingStore.Models
{
	public class Review
	{
		public int Id { get; set; }
		public string User_Id { get; set; }
		public User User { get; set; }

		public int Product_Id { get; set; }
		public Product Product { get; set; }

		public string Content { get; set;}

		public DateTime ReviewDate { get; set; }

		public int StarNumber { get; set; }

	}
}
