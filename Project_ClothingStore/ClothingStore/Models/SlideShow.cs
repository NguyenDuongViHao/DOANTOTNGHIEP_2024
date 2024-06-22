namespace ClothingStore.Models
{
	public class SlideShow
	{
		public int Id { get; set; }

		public string User_Id { get; set; }
		public User User { get; set; }

		public string FileName { get; set;}

		public bool Status { get; set;}
	}
}
