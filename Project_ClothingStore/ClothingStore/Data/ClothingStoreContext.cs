using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ClothingStore.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ClothingStore.Data
{
    public class ClothingStoreContext : IdentityDbContext<User>
    {
        public ClothingStoreContext (DbContextOptions<ClothingStoreContext> options)
            : base(options)
        {
        }

        public DbSet<ClothingStore.Models.Product> Product { get; set; } = default!;

        public DbSet<ClothingStore.Models.ProductDetail> ProductDetail { get; set; }

        public DbSet<ClothingStore.Models.Image> Image { get; set; }

        public DbSet<ClothingStore.Models.Size> Size { get; set; }

        public DbSet<ClothingStore.Models.Color> Color { get; set; }

        public DbSet<ClothingStore.Models.Promotion> Promotion { get; set; }

        public DbSet<ClothingStore.Models.PromotionDetail> PromotionDetail { get; set; }

        public DbSet<ClothingStore.Models.Category> Category { get; set; }

        public DbSet<ClothingStore.Models.Review> Review { get; set; }

        public DbSet<ClothingStore.Models.Favourite> Favourite { get; set; }

        public DbSet<ClothingStore.Models.SlideShow> SlideShow { get; set; }

        public DbSet<ClothingStore.Models.Cart> Cart { get; set; }

        public DbSet<ClothingStore.Models.Invoice> Invoice { get; set; }

        public DbSet<ClothingStore.Models.InvoiceDetail> InvoiceDetail { get; set; }

        public DbSet<ClothingStore.Models.Messages> Messages { get; set; }
    }
}
