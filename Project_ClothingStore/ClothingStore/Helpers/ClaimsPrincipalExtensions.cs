using System.Security.Claims;

namespace ClothingStore.Helpers
{
	public static class ClaimsPrincipalExtensions
	{
		public static string GetUserId(this ClaimsPrincipal principal)
		{
			var name = principal.FindFirstValue(ClaimTypes.NameIdentifier);
			if (!string.IsNullOrEmpty(name))
			{
				return name;
			}
			else
			{
				throw new Exception("NameIdentifier claim not found or has an invalid format");
			}
		}
	}
}
