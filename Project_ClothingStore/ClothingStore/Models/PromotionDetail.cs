namespace ClothingStore.Models
{
	public class PromotionDetail
	{
		public int Id { get; set; }

		public int ProductId { get; set; }
		public Product Product { get; set; }

		public int PromotionId { get; set;}
		public Promotion Promotion { get; set; }

		public bool Status { get; set; }
	}
}
