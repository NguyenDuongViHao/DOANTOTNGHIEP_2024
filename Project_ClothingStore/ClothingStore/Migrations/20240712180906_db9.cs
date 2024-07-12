using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClothingStore.Migrations
{
    public partial class db9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductDetail_ProductId",
                table: "ProductDetail");

            migrationBuilder.RenameColumn(
                name: "MoMo",
                table: "Invoice",
                newName: "Vnpay");

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetail_ProductId_SizeId_ColorId",
                table: "ProductDetail",
                columns: new[] { "ProductId", "SizeId", "ColorId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductDetail_ProductId_SizeId_ColorId",
                table: "ProductDetail");

            migrationBuilder.RenameColumn(
                name: "Vnpay",
                table: "Invoice",
                newName: "MoMo");

            migrationBuilder.CreateIndex(
                name: "IX_ProductDetail_ProductId",
                table: "ProductDetail",
                column: "ProductId");
        }
    }
}
