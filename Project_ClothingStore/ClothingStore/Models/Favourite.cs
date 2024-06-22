namespace ClothingStore.Models
{
	public class Favourite
	{
		public int Id { get; set; }

		public string User_Id { get; set; }
		public User User { get; set; }

		public int Product_Id { get; set;}
		public Product Product { get; set;  }
	}
}
