namespace ClothingStore.Models
{
	public class ReviewViewModel
	{
		public int Id { get; set; }
		public string UserName { get; set; }

		public string Content { get; set; }

		public string ReviewDate { get; set; }

		public int StarNumber { get; set; }

		public string NameSize { get; set; }

		public string NameColor { get; set; }

		public int oneStars { get; set; }

		public int twoStars { get; set; }

		public int threeStars { get; set; }

		public int fourStars { get; set; }

		public int fiveStars { get;set; }

		public int totalStars { get; set; }

		public double averageRating { get; set; }
	}
}
