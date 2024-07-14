using System.ComponentModel.DataAnnotations.Schema;

namespace ClothingStore.Models
{
	public class Image
	{
		public int Id { get; set; }

		public int ProductId { get; set; }
		public Product Product { get; set; }

		public string ImageURL { get; set; }
		[NotMapped]
		public IFormFile FileImage { get; set; }
	}
}