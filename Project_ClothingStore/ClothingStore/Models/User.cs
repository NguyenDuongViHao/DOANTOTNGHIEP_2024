using Microsoft.AspNetCore.Identity;

namespace ClothingStore.Models
{
	public class User : IdentityUser
	{
		//public int Id { get; set; }
		public string FullName { get; set; }

		public string Password { get; set; }
		
		public string Adress { get; set; }

		public string Phone { get; set; }

		public string Email { get; set; }

		public bool Status { get; set; }
	}
}
