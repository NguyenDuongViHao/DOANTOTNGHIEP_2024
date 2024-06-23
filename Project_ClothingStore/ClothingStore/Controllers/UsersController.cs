using ClothingStore.Data;
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
            
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>>GetUsers()
        {
            var users = await _userManager.Users
                .Where(u => u.Status)
                .ToListAsync();
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
			return await _userManager.FindByIdAsync(id);

		}
		[HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(string Username, string Password)
        {
            var user = await _userManager.FindByNameAsync(Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
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
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(string Username, string Password, string Email)
        {
            var userExists = await _userManager.FindByNameAsync(Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError);

            User user = new User()
            {
                Email = Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = Username,
                Status = true
            };
            var result = await _userManager.CreateAsync(user, Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError);

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
    }
}
