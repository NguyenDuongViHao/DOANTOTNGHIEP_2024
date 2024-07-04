namespace ClothingStore.Models
{
	public class InvoiceViewModel
	{
		public int Id { get; set; }

		public string UserName { get; set; }

		public string IssueDate { get; set; }

		public string Code { get; set; }

		public string ShippingAddress { get; set; }

		public string ShippingPhone { get; set; }

		public double Discount { get; set; }

		public double Total { get; set; }

		public int TotalQuantity { get; set; }

		public string ApproveOrder { get; set; }

		public bool COD { get; set; }

		public bool MoMo { get; set; }

		public string NameProduct { get; set; }

		public bool Status { get; set; }

	}
}
