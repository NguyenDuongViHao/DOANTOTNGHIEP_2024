namespace ClothingStore.Models
{
	public class Messages
	{
		public int Id { get; set; }

		public string Content { get; set; }

		public string Title { get; set; }

		public DateTime DateTimes { get; set; }

		public string URL { get; set; }

		public string User_Id { get; set; }
		public User User { get; set; }

		public bool Status { get; set;}

	}
}
