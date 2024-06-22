namespace ClothingStore.Models
{
	public class PromotionDetail
	{
		public int Id { get; set; }

		public int Product_Id { get; set; }
		public Product Product { get; set; }

		public int Promotion_Id { get; set;}
		public Promotion Promotion { get; set; }

		public bool Status { get; set; }
	}
}
