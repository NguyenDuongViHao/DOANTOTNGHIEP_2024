using Microsoft.AspNetCore.Identity;

namespace ClothingStore.Models
{
	public class User : IdentityUser
	{
		public string FullName { get; set; }

		public string Address { get; set; }

		public bool Status { get; set; }
	}
}
