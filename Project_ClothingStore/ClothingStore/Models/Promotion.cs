namespace ClothingStore.Models
{
	public class Promotion
	{
		public int Id { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public double Discount { get; set; }
		public bool Status { get; set; }
	}
}
