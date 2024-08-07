﻿namespace ClothingStore.Models
{
	public class Invoice
	{
		public int Id { get; set; }
		
		public string UserId { get; set; }
		public User User { get; set; }

		public string Code { get; set; }

		public DateTime IssueDate { get; set;}

		public string ShippingAddress { get; set; }

		public string ShippingPhone { get; set;}

		public double Discount { get; set; }

		public double Total { get; set;}

		public string ApproveOrder { get; set; }

		public bool	 COD { get;set; }

		public bool	 Vnpay { get; set; }

		public bool Status { get; set; }

	}
}
