using ClothingStore.Data;
using ClothingStore.Helpers;
using ClothingStore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ClothingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ClothingStoreContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public UsersController(
            ClothingStoreContext context,
            UserManager<User> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IConfiguration configuration
            )
        {
            _context= context;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>>GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            List<UserViewModel> list = new List<UserViewModel>();
            foreach (var user in users)
            {
                list.Add(new UserViewModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    FullName = user.FullName,
                    Address = user.Address,
                    Email = user.Email,
                    Status = user.Status,
                });
            }
            return Ok(list);
        }

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> GetUser(string id)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null || !user.Status)
			{
				return NotFound();
			}

			return Ok(user);
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteUser(string id)
		{
			var user = await _context.Users.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			user.Status = false;
			_context.Users.Update(user);
			var result = await _context.SaveChangesAsync();
			if (result > 0)
			{
				return Ok();
			}
			else
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Unable to");
			}
		}
		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login(LoginViewModel login)
		{
			if (ModelState.IsValid)
			{
				var user = await _userManager.FindByNameAsync(login.Username);

				if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
				{
					var userRoles = await _userManager.GetRolesAsync(user);
					var UserId = user.Id.ToString();
					var authClaims = new List<Claim>
					{
						new Claim(ClaimTypes.Name, user.UserName),
						new Claim(ClaimTypes.NameIdentifier, UserId),
						new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
					};

					foreach (var userRole in userRoles)
					{
						authClaims.Add(new Claim(ClaimTypes.Role, userRole));
					}

					var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

					var token = new JwtSecurityToken(
						issuer: _configuration["JWT:ValidIssuer"],
						audience: _configuration["JWT:ValidAudience"],
						expires: DateTime.Now.AddHours(3),
						claims: authClaims,
						signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
					);


					return Ok(new
					{
						token = new JwtSecurityTokenHandler().WriteToken(token),
						userRoles = userRoles.ToList(),
						userId = UserId,
						expiration = token.ValidTo
					});
				}

				return Unauthorized(new { message = "Invalid username or password" });
			}

			return BadRequest(ModelState);
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(RegisterViewModel re)
		{
			var userExists = await _userManager.FindByNameAsync(re.UserName);
			if (userExists != null)
				return StatusCode(StatusCodes.Status500InternalServerError);

			User user = new User()
			{
				Email = re.Email,
				SecurityStamp = Guid.NewGuid().ToString(),
				UserName = re.UserName,
				Status = true

			};
			var result = await _userManager.CreateAsync(user, re.PassWord);

			if (!result.Succeeded)
				return StatusCode(StatusCodes.Status500InternalServerError);

			if (!await _roleManager.RoleExistsAsync("Admin"))
				await _roleManager.CreateAsync(new IdentityRole("Admin"));

			if (!await _roleManager.RoleExistsAsync("User"))
				await _roleManager.CreateAsync(new IdentityRole("User"));

			if (await _roleManager.RoleExistsAsync("User"))
			{
				await _userManager.AddToRoleAsync(user, "User");
			}

			return Ok();
		}

		[HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin(string Username, string Password, string Email)
        {
            var userExists = await _userManager.FindByNameAsync(Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = Username
            };
            var result = await _userManager.CreateAsync(user, Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }

            return Ok();
        }

		[HttpPut("{UserId}")]
		public async Task<ActionResult<User>> PutAddressAndPhone(string UserId, [FromBody] ShippingViewModel model)
		{
			if (UserId != model.Id)
			{
				return BadRequest("User ID mismatch");
			}
			var user = await _userManager.FindByIdAsync(UserId);
			if (user == null)
			{
				return NotFound("User not found");
			}
			user.PhoneNumber = model.PhoneNumber;
			user.Address = model.Address;
			user.FullName = model.FullName;

			var result = await _userManager.UpdateAsync(user);
			if (result.Succeeded)
			{
				return NoContent();
			}

			foreach (var error in result.Errors)
			{
				ModelState.AddModelError(string.Empty, error.Description);
			}

			return BadRequest(ModelState);
		}

		[HttpPut("updateInfoUser/{id}")]
		public async Task<IActionResult> PutUser(string id, UserViewModel userViewModel)
		{
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
			{
				return NotFound();
			}
			// Update user properties
			user.UserName = userViewModel.UserName;
			user.FullName = userViewModel.FullName;
			user.Address = userViewModel.Address;
			user.Email = userViewModel.Email;
			user.PhoneNumber = userViewModel.PhoneNumber;

			var result = await _userManager.UpdateAsync(user);
			if (result.Succeeded)
			{
				return Ok(); // Successful update
			}
			else
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Unable to update user.");
			}
		}
	}
}
