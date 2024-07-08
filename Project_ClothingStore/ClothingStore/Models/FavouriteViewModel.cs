namespace ClothingStore.Models
{
	public class FavouriteViewModel
	{
		public int Id { get; set; }

		public int ProductId { get; set; }
		public string NameProduct { get; set; }

		public double Price { get; set; }

		public double Start { get; set; }

		public string ImageName { get; set; }
	}
}
