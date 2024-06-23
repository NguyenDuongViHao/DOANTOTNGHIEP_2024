namespace ClothingStore.Models
{
	public class SlideShow
	{
		public int Id { get; set; }

		public string UserId { get; set; }
		public User User { get; set; }

		public string FileName { get; set;}

		public bool Status { get; set;}
	}
}
