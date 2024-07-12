using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ClothingStore.Data;
using ClothingStore.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CodeMegaVNPay.Services;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ClothingStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ClothingStoreContext") ?? throw new InvalidOperationException("Connection string 'ClothingStoreContext' not found.")));

// Register VNPay service
//builder.Services.AddScoped<IVnPayService, VnPayService>();
builder.Services.AddTransient<IVnPayService, VnPayService>();

// Cấu hình để sử dụng Configuration

//Config cho Indentity
builder.Services.AddIdentity<User, IdentityRole>()
				.AddEntityFrameworkStores<ClothingStoreContext>()
				.AddDefaultTokenProviders();
//Add Config for Required Email
builder.Services.Configure<DataProtectionTokenProviderOptions>(option =>
{
	//Reset token valid for 2 hours
	option.TokenLifespan = TimeSpan.FromHours(2);
});
	
//Config cho Authentication
builder.Services.AddAuthentication(option =>
{
	option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

//Config cho JWT
.AddJwtBearer(option =>
{
	option.SaveToken = true;
	option.RequireHttpsMetadata = false;
	option.TokenValidationParameters = new TokenValidationParameters()
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidAudience = builder.Configuration["JWT:ValidAudience"],
		ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
	};
});
builder.Services.AddControllers();
//Config CORS
builder.Services.AddCors(option =>
{
	option.AddDefaultPolicy(builder =>
	{
		builder.AllowAnyOrigin()
				.AllowAnyHeader()
				.AllowAnyMethod();
	});
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
