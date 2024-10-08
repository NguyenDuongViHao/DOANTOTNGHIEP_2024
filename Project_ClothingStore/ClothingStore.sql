USE [ClothingStore]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'3541d52f-5f75-4661-933a-2ad2ebcc1725', N'User', N'USER', N'29c764d2-0d31-4315-8094-cf51f48c74fb')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'f176a06b-2c05-44b3-a532-1a3113d37687', N'Admin', N'ADMIN', N'19f92d1c-e432-41c7-b280-ffd0b4fb2159')
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Address], [Status], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'a100c5ba-d2e8-46cf-b989-903dec44352d', NULL, NULL, 0, N'NhatHuy0312', N'NHATHUY0312', N'nhathuy2003@gmail.com', N'NHATHUY2003@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEI0bapSAiWSctmaHzMRNzPfsvSslmNLIa6IGUvtirkgUH88HAwFC0VNUfOUysjPGaw==', N'3E43Q7P2CIGV3POONL7PJUYPLRKOMD4W', N'74769a60-f80f-4130-8434-7061122d9b7f', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUsers] ([Id], [FullName], [Address], [Status], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES (N'f0275770-5403-4f2a-8d9e-dec581789f9a', NULL, NULL, 0, N'Vihao2310', N'VIHAO2310', N'nvihao2003z@gmail.com', N'NVIHAO2003Z@GMAIL.COM', 0, N'AQAAAAEAACcQAAAAEEbvPyg2j89bZrd4d8aHpdn1TKSc5GdPzamTV/saZVQo0MZw+Muypl3zkVAc4UoH8Q==', N'JRWHL6B47LJGJWTZDGQLO43S4J42EDO3', N'56495954-20de-4f1c-a54a-928f80939a54', NULL, 0, 0, NULL, 1, 0)
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'a100c5ba-d2e8-46cf-b989-903dec44352d', N'f176a06b-2c05-44b3-a532-1a3113d37687')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'f0275770-5403-4f2a-8d9e-dec581789f9a', N'f176a06b-2c05-44b3-a532-1a3113d37687')
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (2, N'Áo Sơ Mi', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (3, N'Áo Thun', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (4, N'Áo PoLo', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (5, N'Quần Jean', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (6, N'Quần Jogger ', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (7, N'Quần Kaki', 1)
INSERT [dbo].[Category] ([Id], [Name], [Status]) VALUES (9, N'Quần Short', 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (3, 2, N'Áo Sơ Mi Blue Collar Snap Buttons Vani 90s', N'- Chất Liệu: Rayon
- Form Áo: Relaxed
- Độ Co Giãn: Không
- Tay Áo: Ngắn
- Cổ Áo: Cổ Cuba
- Phong Cách: Casual', 350000, CAST(N'2024-01-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (5, 3, N'Áo Thun A Side Line Pressed Neck BTW', N'- Chất Liệu: Thun Cotton
- Form Áo: Regular
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Cổ Áo: Cổ Tròn
- Loại Áo: In Hình
- Phong Cách: Casual', 290000, CAST(N'2024-02-03 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (7, 2, N'Áo So Mi Coban Cheerup Party', N'- Chất Liệu: Linen Xược
- Form Áo: Relaxed
- Độ Co Giãn: Không
- Tay Áo: Dài
- Cổ Áo: Cổ Đức
- Phong Cách: Casual
- Chi Tiết: Phối Túi', 429000, CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (8, 2, N'Ao So Mi Cuban Green Shoulder Reborn', N'- Chất Liệu: Cotton Voan
- Form Áo: Relaxed
- Độ Co Giãn: Không
- Tay Áo: Dài
- Cổ Áo: Cổ Đức
- Phong Cách: Basic', 490000, CAST(N'2024-05-23 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (10, 2, N'Ao So Mi Denim Essentials BTW', N'- Chất Liệu: Cotton Blend
- Form Áo: Boxy
- Độ Co Giãn: Trung Bình
- Tay Áo: Ngắn
- Cổ Áo: Cổ Cuba
- Phong Cách: Casual', 380000, CAST(N'2024-08-12 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (11, 2, N'Ao So Mi Nano May Basic', N'- Chất Liệu: 95 PL 5 Spandex
- Form Áo: Relaxed
- Độ Co Giãn: Không
- Tay Áo: Ngắn
- Cổ Áo: Cổ Đức
- Loại Áo: Trơn
- Phong Cách: Casual', 350000, CAST(N'2024-05-06 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (12, 2, N'Ao So Mi Flexing Trendy Duck', N'- Chất Liệu: Oxford
- Form Áo: Slim Fit
- Độ Co Giãn: Không
- Tay Áo: Dài
- Cổ Áo: Cổ Đức
- Phong Cách: Basic
- Chi Tiết: Phối Túi', 380000, CAST(N'2024-07-05 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (14, 3, N'Ao Thun Henley Slim White Gray Cream', N'- Chất Liệu: Cotton
- Form Áo: Boxy
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Cổ Áo: Cổ Tròn
- Phong Cách: Street Style', 320000, CAST(N'2024-08-11 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (15, 3, N'Ao Thun Raglan Bears Stickers 360GSM', N'- Chất Liệu: Cotton
- Form Áo: Regular
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Cổ Áo: Cổ Tròn
- Loại Áo: In Hình
- Phong Cách: Casual
- Định Lượng: 250GSM', 240000, CAST(N'2024-02-03 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (16, 3, N'Ao Thun The Camp Series', N'- Chất Liệu: Cotton
- Form Áo: Regular
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Cổ Áo: Cổ Tròn
- Phong Cách: Casual', 380000, CAST(N'2024-02-08 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (17, 4, N'Ao Polo Athletic The Checked No 10', N'- Chất Liệu: Polo 4 Chiều
- Form Áo: Slim Fit
- Độ Co Giãn: Nhiều
- Tay Áo: Tay Ngắn
- Loại Áo: Áo Trơn
- Phong Cách: Basic', 350000, CAST(N'2024-05-05 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (18, 4, N'Ao Polo Hidden Placket Cool Fab', N'- Chất Liệu: Cá Sấu Mắt Chim
- Form Áo: Oversize
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Phong Cách: Street Style', 420000, CAST(N'2024-03-23 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (19, 4, N'Ao Polo Vneck Brownline White', N'- Chất Liệu: Cá Sấu TC 2 Chiều
- Form Áo: Regular
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Phong Cách: Casual', 410000, CAST(N'2024-07-14 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (20, 4, N'Ao Polo Special Vacation Tropical', N'- Chất Liệu: Cá Sấu TC 2 Chiều
- Form Áo: Regular
- Độ Co Giãn: Trung Bình
- Tay Áo: Tay Ngắn
- Loại Áo: In Hình
- Phong Cách: Casual', 390000, CAST(N'2024-06-12 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (21, 5, N'Quan Jean Flare Unfinished Hem', N'- Chất Liệu: Jean Cotton
- Độ Dày: Vừa
- Độ Co Giãn: Không
- Form Quần: Relaxed
- Loại Quần: Wash Trơn
- Phong Cách: Street Style
- Chi Tiết: Phối Túi', 560000, CAST(N'2024-02-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (22, 5, N'Quan Jean Skinny Blue Wash', N'- Chất Liệu: Jean Cotton
- Độ Dày: Vừa
- Độ Co Giãn: Ít
- Form Quần: Flare
- Loại Quần: Wash Trơn
- Phong Cách: Street Style
- Chi Tiết: Phối Túi', 550000, CAST(N'2024-02-01 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (23, 5, N'Quan Jean Slim Black Basic', N'- Chất Liệu: Cotton Pha Spandex
- Độ Dày: Vừa
- Độ Co Giãn: Trung Bình
- Form Quần: Slim Fit
- Loại Quần: Wash Trơn
- Phong Cách: Casual
- Chi Tiết: Phối Túi', 550000, CAST(N'2024-01-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (24, 5, N'Quan Jean Straight Cargo Zipper Velcro', N'- Chất Liệu: Cotton Pha Spandex
- Độ Dày: Vừa
- Độ Co Giãn: Trung Bình
- Form Quần: Skinny
- Loại Quần: Trơn
- Phong Cách: Basic
- Chi Tiết: Phối Túi', 580000, CAST(N'2024-01-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (25, 6, N'Jogger Denim Angle Side Zipper', N'- Chất Liệu: Jean Cotton
- Độ Co Giãn: Ít
- Form Quần: Slim Fit
- Loại Quần: Trơn
- Phong Cách: Basic
- Chi Tiết: Phối Túi', 550000, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (26, 6, N'Quan Dai Comfort Daily Wear', N'- Chất Liệu: Kaki Phủ Da
- Độ Dày: Vừa
- Độ Co Giãn: Ít
- Form Quần: Skinny
- Loại Quần: Trơn
- Phong Cách : Basic, Street Style
- Chi Tiết: Phối Túi', 390000, CAST(N'2024-03-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (27, 6, N'Jogger Mini Label Fall Winter Col', N'- Chất Liệu: Kaki
- Độ Co Giãn: Ít
- Form Quần: Slim Fit
- Loại Quần: Trơn
- Phong Cách: Casual, Street Style
- Chi Tiết: Phối Túi', 200000, CAST(N'2024-04-02 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (28, 6, N'Quan Dai Straight Foam Material Blue', N'- Chất Liệu: 90 Polyester 10 Elastane
- Độ Dày: Vừa
- Độ Co Giãn: Nhiều
- Form Quần: Slim Fit
- Loại Quần: Trơn
- Phong Cách : Basic
- Chi Tiết: Phối Túi', 210000, CAST(N'2024-04-03 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (30, 7, N'Quan Kaki Cargo Pant Black Grey', N'- Chất Liệu: Kaki Linen
- Độ Dày: Vừa
- Độ Co Giãn: Không
- Form Quần: Straight
- Loại Quần: Túi Hộp
- Phong Cách : Street Style
- Chi Tiết: Phối Túi', 450000, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (31, 7, N'Quan Kaki Elas Ironic Mark', N'- Chất Liệu: Kaki
- Độ Dày: Vừa
- Độ Co Giãn: Trung Bình
- Form Quần: Slim Fit
- Loại Quần: Trơn
- Phong Cách : Basic
- Chi Tiết: Phối Túi', 400000, CAST(N'2024-08-23 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (32, 7, N'Quan Kaki Mininet Formal', N'- Chất Liệu: Kaki Cotton
- Độ Dày: Vừa
- Độ Co Giãn: Trung Bình
- Form Quần: Slim Fit
- Loại Quần: Trơn
- Phong Cách : Basic
- Chi Tiết: Phối Túi', 240000, CAST(N'2024-06-03 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (33, 9, N'Quan Short Cargo Minimal', N'- Chất Liệu: Kaki Cotton
- Độ Co Giãn: Không
- Form Quần: Relaxed
- Phong Cách: Casual
- Chi Tiết : Phối Túi', 390000, CAST(N'2024-02-06 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (35, 9, N'Quan Short Relaxed Cream Blue Mix 90s', N'- Chất Liệu: Pique CVC 2 Chiều
- Độ Co Giãn: Trung Bình
- Form Quần: Relaxed
- Loại Quần : Trơn
- Phong Cách: Casual
- Chi Tiết : Phối Túi', 300000, CAST(N'2024-06-10 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (36, 9, N'Quan Short Straight Modern Side Mix', N'- Chất Liệu: Jean Cotton
- Độ Co Giãn: Không
- Form Quần: Straight
- Loại Quần : Trơn
- Phong Cách: Street Style
- Chi Tiết : Phối Túi', 330000, CAST(N'2024-06-14 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
INSERT [dbo].[Product] ([Id], [CategoryId], [Name], [Description], [Price], [CreateTime], [Status], [Brand], [Origin]) VALUES (37, 9, N'Quan Short Waist Mix Mark', N'- Chất Liệu: Nỉ Mộc
- Độ Co Giãn: Trung Bình
- Form Quần: Relaxed
- Loại Quần : Trơn
- Chi Tiết : Phối Túi, Lưng Chun', 280000, CAST(N'2024-01-01 00:00:00.0000000' AS DateTime2), 1, N'CLT', N'Việt Nam')
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Color] ON 

INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (1, N'Đen', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (2, N'Trắng', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (3, N'Nâu', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (4, N'Xám', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (5, N'Be', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (6, N'Vàng', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (7, N'Đỏ', 1)
INSERT [dbo].[Color] ([Id], [NameColor], [Status]) VALUES (8, N'Xanh', 1)
SET IDENTITY_INSERT [dbo].[Color] OFF
SET IDENTITY_INSERT [dbo].[Size] ON 

INSERT [dbo].[Size] ([Id], [NameSize], [Status]) VALUES (1, N'S', 1)
INSERT [dbo].[Size] ([Id], [NameSize], [Status]) VALUES (2, N'M', 1)
INSERT [dbo].[Size] ([Id], [NameSize], [Status]) VALUES (3, N'L', 1)
INSERT [dbo].[Size] ([Id], [NameSize], [Status]) VALUES (4, N'XL', 1)
SET IDENTITY_INSERT [dbo].[Size] OFF
SET IDENTITY_INSERT [dbo].[ProductDetail] ON 

INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (1, 1, 1, 3, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (3, 1, 5, 3, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (4, 2, 2, 3, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (5, 2, 1, 3, 9)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (6, 2, 5, 3, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (7, 1, 2, 3, 7)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (8, 1, 6, 5, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (10, 1, 2, 5, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (11, 2, 6, 5, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (12, 2, 2, 5, 6)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (13, 1, 1, 8, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (14, 1, 2, 8, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (15, 3, 4, 10, 5)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (16, 4, 4, 10, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (18, 1, 5, 11, 20)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (19, 3, 5, 11, 11)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (20, 2, 2, 12, 18)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (21, 2, 5, 14, 14)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (22, 3, 2, 15, 11)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (23, 1, 7, 16, 13)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (24, 2, 6, 17, 14)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (25, 1, 8, 18, 23)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (26, 1, 1, 18, 11)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (27, 2, 3, 19, 13)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (28, 2, 2, 20, 14)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (30, 1, 4, 21, 7)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (31, 1, 2, 22, 4)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (32, 1, 5, 23, 7)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (33, 1, 8, 24, 8)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (34, 2, 7, 25, 12)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (35, 2, 2, 26, 16)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (36, 2, 6, 27, 1)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (37, 2, 3, 28, 10)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (39, 4, 2, 30, 11)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (40, 2, 4, 31, 14)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (41, 2, 5, 32, 15)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (42, 2, 6, 33, 7)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (44, 1, 7, 35, 23)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (45, 1, 2, 36, 12)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (46, 1, 4, 36, 21)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (51, 2, 3, 37, 5)
INSERT [dbo].[ProductDetail] ([Id], [SizeId], [ColorId], [ProductId], [Quantity]) VALUES (53, 2, 5, 37, 7)
SET IDENTITY_INSERT [dbo].[ProductDetail] OFF
SET IDENTITY_INSERT [dbo].[Image] ON 

INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (1, 3, N'Ao So Mi Blue Collar Snap Buttons Vani 90s.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (2, 5, N'Ao Thun A Side Line Pressed Neck BTW.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (3, 7, N'Ao So Mi Coban Cheerup Party.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (4, 8, N'Ao So Mi Cuban Green Shoulder Reborn.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (5, 10, N'Ao So Mi Denim Essentials BTW.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (6, 11, N'Ao So Mi Nano May Basic.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (7, 12, N'Ao So Mi Flexing Trendy Duck.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (8, 14, N'Ao Thun Henley Slim White Gray Cream.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (9, 15, N'Ao Thun Raglan Bears Stickers 360GSM.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (10, 16, N'Ao Thun The Camp Series.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (11, 17, N'Ao Polo Athletic The Checked No 10.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (12, 18, N'Ao Polo Hidden Placket Cool Fab.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (13, 19, N'Ao Polo Vneck Brownline White.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (14, 20, N'Ao Polo Special Vacation Tropical.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (15, 21, N'Quan Jean Flare Unfinished Hem.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (16, 22, N'Quan Jean Skinny Blue Wash.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (17, 23, N'Quan Jean Slim Black Basic.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (18, 24, N'Quan Jean Straight Cargo Zipper Velcro.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (19, 25, N'Jogger Denim Angle Side Zipper.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (20, 26, N'Quan Dai Comfort Daily Wear.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (21, 27, N'Jogger Mini Label Fall Winter Col.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (22, 28, N'Quan Dai Straight Foam Material Blue.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (23, 30, N'Quan Kaki Cargo Pant Black Grey.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (24, 31, N'Quan Kaki Elas Ironic Mark.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (25, 32, N'Quan Kaki Mininet Formal.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (26, 33, N'Quan Short Cargo Minimal.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (27, 35, N'Quan Short Relaxed Cream Blue Mix 90s.jpg')
INSERT [dbo].[Image] ([Id], [ProductId], [ImageURL]) VALUES (28, 36, N'Quan Short Straight Modern Side Mix.jpg')
SET IDENTITY_INSERT [dbo].[Image] OFF
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240625110258_db1', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240628154951_db2', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240629094533_db3', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240629101122_db4', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240704034827_db5', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240704180948_db6', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240709193425_db7', N'6.0.31')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240710033817_db8', N'6.0.31')
