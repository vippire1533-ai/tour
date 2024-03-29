USE [master]
GO
IF EXISTS(SELECT 1 FROM sys.databases WHERE name = 'Tour')
BEGIN
	DROP DATABASE Tour;
END
GO
/****** Object:  Database [Tour]    Script Date: 5/4/2022 1:54:42 PM ******/
CREATE DATABASE [Tour]
GO
USE [Tour]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[MAADMIN] [int] NOT NULL IDENTITY(1,1),
	[USERNAME] [nvarchar](30) NULL,
	[PASSADMIN] [nvarchar](50) NULL,
	[STATUS] [nvarchar](10) NULL,
	[IS_ADMIN] [bit] DEFAULT 1, 
 CONSTRAINT [PK_Admin] PRIMARY KEY CLUSTERED 
(
	[MAADMIN] ASC
)
)
GO
/****** Object:  Table [dbo].[BinhLuan]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BinhLuan](
	[MABINHLUAN] [int] NOT NULL IDENTITY(1,1),
	[MAKH] [varchar](50) NULL,
	[MATOUR] [int] NULL,
	[NOIDUNG] [nvarchar](50) NULL,
	[VOTE] [int] NULL,
 CONSTRAINT [PK_BinhLuan] PRIMARY KEY CLUSTERED 
(
	[MABINHLUAN] ASC
)
) 
GO
/****** Object:  Table [dbo].[ChiTietTag]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietTag](
	[MATOUR] [int] NULL,
	[MATAG] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DonDatTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DonDatTour](
	[MADONDAT] [int] NOT NULL IDENTITY(1,1),
	[MAKHACHHANG] [varchar](50) NULL,
	[MATOUR] [int] NULL,
	[NGAYDAT] [datetime] NULL,
	[TINHTRANGTHANHTOAN] [nvarchar](20) NULL,
	[SOLUONGVEDAT] [int] NULL,
	[TONGTIEN] [int] NULL,
	[MA_LOAI_VE] [int] NULL,
	[TINH_TRANG_DON] nvarchar(50) default null,
	[MA_PHIEN_GIAO_DICH] varchar(50),
	[NGAY_TAO_DON] datetime default getdate()
 CONSTRAINT [PK_DonDatVe_1] PRIMARY KEY CLUSTERED 
(
	[MADONDAT] ASC
)
)
GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhachHang](
	[MAKH] [varchar](50) NOT NULL,
	[USERNAME] [nvarchar](50) NOT NULL,
	[PASSWORD] [nvarchar](50) NOT NULL,
	[HOTEN] [nvarchar](50) NOT NULL,
	[GIOITINH] [nvarchar](10) NULL,
	[EMAIL] [nvarchar](50) NOT NULL,
	[DIACHI] [nvarchar](50) NULL,
	[SDT] [int] NOT NULL,
	[DIEMTHUONG] [int] NULL,
 CONSTRAINT [PK_KhachHang] PRIMARY KEY CLUSTERED 
(
	[MAKH] ASC
)
)
GO
/****** Object:  Table [dbo].[LoaiTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiTour](
	[MALOAI] [int] NOT NULL IDENTITY(1,1),
	[TENLOAI] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_LoạiTour] PRIMARY KEY CLUSTERED 
(
	[MALOAI] ASC
)
)
GO
/****** Object:  Table [dbo].[LoaiVe]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiVe](
	[MALOAI] [int] NOT NULL IDENTITY(1,1),
	[TENLOAI] [nvarchar](20) NULL,
	[SO_TIEN_GIAM] [int] default 0,
 CONSTRAINT [PK_LoaiVe] PRIMARY KEY CLUSTERED 
(
	[MALOAI] ASC
)
)
GO
/****** Object:  Table [dbo].[PARTNER]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PARTNER](
	[MAPARTNER] [int] NOT NULL IDENTITY(1,1),
	[USERNAME] [nvarchar](30) NULL,
	[PASSWWORD] [nvarchar](30) NULL,
	[STATUS] [nvarchar](10) NULL,
	[IS_ADMIN] [bit] DEFAULT 0,
 CONSTRAINT [PK_PARTNER] PRIMARY KEY CLUSTERED 
(
	[MAPARTNER] ASC
)
)
GO
/****** Object:  Table [dbo].[Tag]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[MATAG] [int] NOT NULL IDENTITY(1,1),
	[TENTAG] [nvarchar](50) NULL,
 CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED 
(
	[MATAG] ASC
)
)
GO
/****** Object:  Table [dbo].[Tour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tour](
	[MATOUR] [int] IDENTITY(1,1) NOT NULL,
	[MALOAI] [int]  NULL,
	[TENTOUR] [nvarchar](50) NULL,
	[GTTOUR] [nvarchar](500) NULL,
	[GIATOUR] [int] NULL,
	[NOIDUNGTOUR] [nvarchar](300) NULL,
	[HINHANH] [nvarchar](800) NULL,
	[NGAYDI] [datetime] NULL,
	[DIEMDI] [nvarchar](50) NULL,
	[DIEMDEN] [nvarchar](50) NULL,
	[NGAYTAO] [datetime] NULL,
	[TINH] [nvarchar](50) NULL default '',
	[TINH_TRANG_TOUR] [nvarchar] (50) NULL default N'Còn hiệu lực',
 CONSTRAINT [PK_Tour] PRIMARY KEY CLUSTERED 
(
	[MATOUR] ASC
)
)
GO
/****** Object:  Table [dbo].[VeTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VeTour](
	[MAVE] [int] NOT NULL IDENTITY(1,1),
	[MATOUR] [int] NULL,
	[MAKH] [varchar](50) NULL,
	[NGAYCOHIEULUC] [datetime] NULL,
	[LOAIVE] [int] NULL,
	[NGAYTAO] [datetime] NULL,
	[GIAVE] [int] NULL,
	[TENKH] [nvarchar](50) null,
	[MA_DON_DAT] [int] null,
	[TRANG_THAI_VE] [nvarchar](50) DEFAULT N'Còn hiệu lực', 
 CONSTRAINT [PK_VeTour] PRIMARY KEY CLUSTERED 
(
	[MAVE] ASC
)
)
GO
CREATE TABLE [dbo].[Tour_HinhAnh](
	[MA_HINH_ANH] [int] NOT NULL IDENTITY(1,1),
	[TEN_HINH_ANH] [varchar] (max),
	[HINH_ANH_DATA] [varbinary](max),
	[MA_TOUR] int NULL, 
CONSTRAINT [PK_Tour_HinhAnh] PRIMARY KEY CLUSTERED 
(
	[MA_HINH_ANH] ASC
)
)
GO

-- Insert
INSERT [dbo].[LoaiTour] ([TENLOAI]) VALUES ( N'Du lịch')
INSERT [dbo].[LoaiTour] ([TENLOAI]) VALUES (N'Thể thao')
INSERT [dbo].[LoaiTour] ([TENLOAI]) VALUES (N'Giải trí')
GO
INSERT [dbo].[LoaiVe] ([TENLOAI], [SO_TIEN_GIAM]) VALUES (N'Người lớn', 0)
INSERT [dbo].[LoaiVe] ([TENLOAI], [SO_TIEN_GIAM]) VALUES (N'Trẻ em', 100000)
GO

INSERT INTO [dbo].[KhachHang] VALUES('1', 'admin', '1', 'Admin', 'Nam', 'admin@gmail.com', 'HCM', '1', 0) 
GO

INSERT INTO [dbo].[Admin](USERNAME, PASSADMIN, STATUS) values('admin', '123456', 'active')
INSERT INTO [dbo].[PARTNER](USERNAME, PASSWWORD, STATUS) values('partner', '123456', 'active')
GO
-- Foreign Key
ALTER TABLE [dbo].[BinhLuan]  WITH CHECK ADD  CONSTRAINT [FK_BinhLuan_KhachHang] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KhachHang] ([MAKH])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BinhLuan] CHECK CONSTRAINT [FK_BinhLuan_KhachHang]
GO
ALTER TABLE [dbo].[BinhLuan]  WITH CHECK ADD  CONSTRAINT [FK_BinhLuan_Tour] FOREIGN KEY([MATOUR])
REFERENCES [dbo].[Tour] ([MATOUR])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[BinhLuan] CHECK CONSTRAINT [FK_BinhLuan_Tour]
GO
ALTER TABLE [dbo].[ChiTietTag]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietTag_Tag] FOREIGN KEY([MATAG])
REFERENCES [dbo].[Tag] ([MATAG])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ChiTietTag] CHECK CONSTRAINT [FK_ChiTietTag_Tag]
GO
ALTER TABLE [dbo].[ChiTietTag]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietTag_Tour] FOREIGN KEY([MATOUR])
REFERENCES [dbo].[Tour] ([MATOUR])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ChiTietTag] CHECK CONSTRAINT [FK_ChiTietTag_Tour]
GO
-- Contraint DonDatTour
ALTER TABLE [dbo].[DonDatTour]  WITH CHECK ADD  CONSTRAINT [FK_DonDatTour_Tour] FOREIGN KEY([MATOUR])
REFERENCES [dbo].[Tour] ([MATOUR])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[DonDatTour] CHECK CONSTRAINT [FK_DonDatTour_Tour]
GO

ALTER TABLE [dbo].[DonDatTour]  WITH CHECK ADD  CONSTRAINT [FK_DonDatVe_KhachHang] FOREIGN KEY([MAKHACHHANG])
REFERENCES [dbo].[KhachHang] ([MAKH])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[DonDatTour] CHECK CONSTRAINT [FK_DonDatVe_KhachHang]
GO

ALTER TABLE [dbo].[DonDatTour]  WITH CHECK ADD  CONSTRAINT [FK_DonDatVe_LoaiVe] FOREIGN KEY([MA_LOAI_VE])
REFERENCES [dbo].[LoaiVe] ([MALOAI])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[DonDatTour] CHECK CONSTRAINT [FK_DonDatVe_LoaiVe]
GO
-- Contraint Tour
ALTER TABLE [dbo].[Tour]  WITH CHECK ADD  CONSTRAINT [FK_Tour_LoaiTour] FOREIGN KEY([MALOAI])
REFERENCES [dbo].[LoaiTour] ([MALOAI])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Tour] CHECK CONSTRAINT [FK_Tour_LoaiTour]
GO
ALTER TABLE [dbo].[VeTour]  WITH CHECK ADD  CONSTRAINT [FK_VeTour_KhachHang] FOREIGN KEY([MAKH])
REFERENCES [dbo].[KhachHang] ([MAKH])
GO
ALTER TABLE [dbo].[VeTour] CHECK CONSTRAINT [FK_VeTour_KhachHang]
GO
ALTER TABLE [dbo].[VeTour]  WITH CHECK ADD  CONSTRAINT [FK_VeTour_LoaiVe] FOREIGN KEY([LOAIVE])
REFERENCES [dbo].[LoaiVe] ([MALOAI])
ON DELETE SET NULL
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VeTour] CHECK CONSTRAINT [FK_VeTour_LoaiVe]
GO
ALTER TABLE [dbo].[VeTour]  WITH CHECK ADD  CONSTRAINT [FK_VeTour_Tour] FOREIGN KEY([MATOUR])
REFERENCES [dbo].[Tour] ([MATOUR])
ON DELETE CASCADE
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VeTour] CHECK CONSTRAINT [FK_VeTour_Tour]
GO
ALTER TABLE [dbo].[VeTour]  WITH CHECK ADD  CONSTRAINT [FK_VeTour_DonDatTour] FOREIGN KEY([MA_DON_DAT])
REFERENCES [dbo].[DonDatTour] ([MADONDAT])
GO
ALTER TABLE [dbo].[VeTour] CHECK CONSTRAINT [FK_VeTour_DonDatTour]
GO
ALTER TABLE [dbo].[Tour_HinhAnh] WITH CHECK ADD CONSTRAINT [FK_Tour_HinhAnh_Tour] FOREIGN KEY ([MA_TOUR])
REFERENCES [dbo].[Tour] ([MATOUR])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tour_HinhAnh] CHECK CONSTRAINT [FK_Tour_HinhAnh_Tour]
GO

/****** Object:  StoredProcedure [dbo].[DeleteTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DeleteTour] 
(@MATOUR int)
as
begin
delete from Tour where MATOUR=@MATOUR
end
GO
/****** Object:  StoredProcedure [dbo].[InsertTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertTour]
@MALOAI int,
@TENTOUR NVARCHAR(50),
@GTTOUR NVARCHAR(50),
@GIATOUR INT,
@NOIDUNGTOUR NVARCHAR(300),
@HINHANH NVARCHAR(800),
@NGAYDI DATETIME ,
@DIEMDI NVARCHAR(50),
@DIEMDEN NVARCHAR(50),
@NGAYTAO DATETIME,
@TINH NVARCHAR(50)
AS 
BEGIN
INSERT INTO Tour (MALOAI,TENTOUR,GTTOUR,GIATOUR,NOIDUNGTOUR,HINHANH,NGAYDI,DIEMDI,DIEMDEN,NGAYTAO,TINH)
VALUES (@MALOAI,@TENTOUR,@GTTOUR,@GIATOUR,@NOIDUNGTOUR,@HINHANH,@NGAYDI,@DIEMDI,@DIEMDEN,@NGAYTAO,@TINH);
SELECT SCOPE_IDENTITY() AS MA_TOUR;
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateTour]    Script Date: 5/4/2022 1:54:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create Procedure [dbo].[UpdateTour]
(
@MATOUR int,
@MALOAI int,
@TENTOUR NVARCHAR(50),
@GTTOUR NVARCHAR(50),
@GIATOUR INT,
@NOIDUNGTOUR NVARCHAR(300),
@HINHANH NVARCHAR(800),
@NGAYDI DATETIME ,
@DIEMDI NVARCHAR(50),
@DIEMDEN NVARCHAR(50),
@NGAYTAO DATETIME

)
AS 
BEGIN
update Tour set MALOAI=@MALOAI,
				TENTOUR=@TENTOUR,
				GTTOUR=@GTTOUR,
				GIATOUR=@GIATOUR,
				NOIDUNGTOUR=@NOIDUNGTOUR,
				HINHANH=@HINHANH,
				NGAYDI=@NGAYDI,
				DIEMDI=@DIEMDI,
				DIEMDEN=@DIEMDEN,
				NGAYTAO=@NGAYTAO 
				where MATOUR=@MATOUR
				end
GO
CREATE PROCEDURE InsertVe
	@SO_LUONG_VE INT,
	@MATOUR INT,
	@NGAYCOHIEULUC DATETIME,
	@LOAIVE INT,
	@NGAYTAO DATETIME,
	@GIAVE INT,
	@TENKH NVARCHAR(50)
AS
	DECLARE @I INT = 1;
	WHILE @I <= @SO_LUONG_VE
	BEGIN
	INSERT INTO VETOUR(MATOUR,NGAYCOHIEULUC,LOAIVE,NGAYTAO,GIAVE,TENKH)
	VALUES
	(@MATOUR,@NGAYCOHIEULUC,@LOAIVE,@NGAYTAO,@GIAVE,@TENKH)
	SET @I = @I + 1;
	END
GO
CREATE PROCEDURE UpdateVe
(
@MAVE int,
@MATOUR int,
@NGAYCOHIEULUC DATETIME,
@LOAIVE int,
@NGAYTAO DATETIME,
@GIAVE int,
@TENKH NVARCHAR(50)
)
as 
begin
Update VeTour set	MATOUR=@MATOUR,
					NGAYCOHIEULUC=@NGAYCOHIEULUC,
					LOAIVE=@LOAIVE,
					NGAYTAO=@NGAYTAO,
					GIAVE=@GIAVE,
					TENKH=@TENKH
					where MAVE=@MAVE
end
GO
CREATE PROCEDURE SetTinhTrangVe
(
@MAVE int,
@TINH_TRANG_VE nvarchar(50)
)
as
begin
	update VeTour set TRANG_THAI_VE = @TINH_TRANG_VE WHERE MAVE = @MAVE
end
GO
-- Loại Tour
	-- Insert LoaiTour
create procedure InsertLoaiTour
(
@TENLOAI nvarchar(50)
)
As 
Begin
Insert into LoaiTour(TENLOAI)
Values
(@TENLOAI)
End
GO
	-- DeleteLoaiTour
Create procedure DeleteLoaiTour
(
@MALOAI int
) 
As 
Begin
Delete From LoaiTour where MALOAI=@MALOAI
end
GO

-- Loai Ve
	-- InsertLoaiVe
create procedure InsertLoaiVe
(
@TENLOAI nvarchar(20),
@SO_TIEN_GIAM int
)
As 
Begin
Insert into LoaiVe(TENLOAI, SO_TIEN_GIAM)
Values
(@TENLOAI, @SO_TIEN_GIAM)
End
GO
	-- DeleteLoaiVe
Create procedure DeleteLoaiVe
(
@MALOAI int
) 
As 
Begin
Delete From LoaiVe where MALOAI=@MALOAI
end
GO
-- DonDatVe
	-- InsertDonDatVe
CREATE PROCEDURE InsertDonDatVe
(
@MANGUOIDAT varchar(50),
@NGAYDAT datetime,
@TINHTRANGTHANHTOAN nvarchar(20),
@SOLUONGVEDAT int
)
As
Begin
Insert into DonDatTour(MAKHACHHANG,NGAYDAT,TINHTRANGTHANHTOAN,SOLUONGVEDAT)
Values
(@MANGUOIDAT,@NGAYDAT,@TINHTRANGTHANHTOAN,@SOLUONGVEDAT)
end
GO
	-- DeleteDonDatVe
CREATE PROCEDURE DeleteDonDatVe
(
@MADATVE int
)
As
Begin
Delete From DonDatTour where MADONDAT=@MADATVE
end
GO
-- Update Loai Ve
CREATE PROCEDURE UpdateLoaiVe (@MALOAI int, @TENLOAI nvarchar(20), @SO_TIEN_GIAM int)
AS
BEGIN
	UPDATE LoaiVe SET TENLOAI = @TENLOAI, SO_TIEN_GIAM = @SO_TIEN_GIAM WHERE MALOAI = @MALOAI
END
GO
-- Update VeTourAndTour
CREATE PROC UpdateVeTourAndTour 
AS
	UPDATE VeTour SET TRANG_THAI_VE = N'Đã quá hạn' WHERE NGAYCOHIEULUC < GETDATE();
	UPDATE Tour SET TINH_TRANG_TOUR = N'Đã quá hạn' WHERE NGAYDI < GETDATE();
GO

CREATE PROC CreateCustomerIfNotExists (
	@MA_KHACH_HANG varchar(50),
	@TEN_DANG_NHAP nvarchar(50),
	@EMAIL nvarchar(50)
)
AS
	IF (NOT EXISTS (SELECT * FROM [dbo].[KhachHang] WHERE MAKH = @MA_KHACH_HANG))
	BEGIN
		INSERT INTO [dbo].[KhachHang](MAKH, USERNAME, PASSWORD, HOTEN, GIOITINH, EMAIL, DIACHI, SDT, DIEMTHUONG)
		VALUES(@MA_KHACH_HANG, @TEN_DANG_NHAP, '1', 'ho_ten', 'nam', @EMAIL, 'dia_chi', 0, 0)
	END 
GO

CREATE PROC DeleteMember(
	@LOAI_THANH_VIEN VARCHAR(10), 
	@MA_THANH_VIEN INT
)
AS
	BEGIN
		IF (@LOAI_THANH_VIEN = 'admin')
		BEGIN
			DELETE FROM Admin WHERE MAADMIN = @MA_THANH_VIEN
		END
		ELSE IF (@LOAI_THANH_VIEN = 'partner')
		BEGIN
			DELETE FROM PARTNER WHERE MAPARTNER = @MA_THANH_VIEN
		END
	END
GO

CREATE PROC UpdateMember(
	@LOAI_THANH_VIEN VARCHAR(10), 
	@MA_THANH_VIEN INT, 
	@MAT_KHAU VARCHAR(50)
)
AS
	BEGIN
		IF (@LOAI_THANH_VIEN = 'admin')
		BEGIN
			UPDATE Admin SET PASSADMIN = @MAT_KHAU WHERE MAADMIN = @MA_THANH_VIEN
		END
		ELSE IF (@LOAI_THANH_VIEN = 'partner')
		BEGIN
			UPDATE PARTNER SET PASSWWORD = @MAT_KHAU WHERE MAPARTNER = @MA_THANH_VIEN
		END
	END
GO

USE [master]
GO
ALTER DATABASE [Tour] SET  READ_WRITE 
GO