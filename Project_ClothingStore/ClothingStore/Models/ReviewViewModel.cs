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
	}
}
