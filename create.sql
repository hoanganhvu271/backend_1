-- Tạo bảng Sinh viên
CREATE TABLE SinhVien (
    MSV  VARCHAR(50) PRIMARY KEY,
    Ten VARCHAR(255),
    Lop VARCHAR(50),
    Email VARCHAR(100),
    TaiKhoan VARCHAR(50),
    MatKhau VARCHAR(500)
);

-- Tạo bảng Bài thi
CREATE TABLE BaiThi (
    MaBaiThi  int auto_increment PRIMARY KEY,
    TenBaiThi VARCHAR(255),
    ThoiGianBatDau DATETIME,
    ThoiGianThi INT,
    SoLuongCau INT,
    TheLoai VARCHAR(50),
    TrangThai VARCHAR(50)
);

-- tạo bảng otp
use testbtl;
CREATE TABLE otp (
	email VARCHAR(255) PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    otp_code VARCHAR(10) NOT NULL
    
);


-- Tạo bảng Kết quả
CREATE TABLE KetQua (
    MaKetQua  VARCHAR(50) PRIMARY KEY,
    MSV  VARCHAR(50),
    MaBaiThi  int,
    Diem FLOAT,
    FOREIGN KEY (MSV) REFERENCES SinhVien(MSV) ON delete cascade on update cascade,
    FOREIGN KEY (MaBaiThi) REFERENCES BaiThi(MaBaiThi)  ON delete cascade on update cascade
);

-- Tạo bảng Câu hỏi
CREATE TABLE CauHoi (
    MaCauHoi  VARCHAR(50) ,
    MaBaiThi  VARCHAR(50),
    DeBai  VARCHAR(200),
    SoThuTu INT,
    TheLoai VARCHAR(50),
    
    PRIMARY KEY(MaCauHoi, MaBaiThi),
    FOREIGN KEY (MaBaiThi) REFERENCES BaiThi(MaBaiThi)  ON delete cascade on update cascade
);

-- Tạo bảng Lựa chọn
CREATE TABLE LuaChon (
    MaCauHoi  VARCHAR(50),
    MaLuaChon  VARCHAR(50),
    MaBaiThi varchar(50),
    Dung BOOLEAN,
    NoiDung  VARCHAR(200),
    PRIMARY KEY (MaCauHoi, MaLuaChon, MaBaiThi),
    FOREIGN KEY (MaCauHoi, MaBaiThi) REFERENCES CauHoi(MaCauHoi, MaBaiThi)  ON delete cascade on update cascade
);

-- Tạo bảng Kết quả từng câu
CREATE TABLE KetQuaTungCau (
    MaChiTiet VARCHAR(50) PRIMARY KEY,
    MaKetqua VARCHAR(50),
    MaBaiThi VARCHAR(50),
    MaCauHoi VARCHAR(50),
    MaLuaChon VARCHAR(5),
    Dung BOOLEAN,
    FOREIGN KEY (MaBaiThi) REFERENCES BaiThi(MaBaiThi)  ON delete cascade on update cascade,
    FOREIGN KEY (MaKetQua) REFERENCES KetQua(MaKetQua)  ON delete cascade on update cascade,
    FOREIGN KEY (MaCauHoi, MaLuaChon) REFERENCES LuaChon(MaCauHoi, MaLuaChon)  ON delete cascade on update cascade
);


CREATE TABLE Admin (
    UserName VARCHAR(50) PRIMARY KEY,
    Email VARCHAR(50),
    Facebook VARCHAR(50),
    Instagram VARCHAR(50),
    FirstName VARCHAR(20),
    LastName VARCHAR(20),
    Pass VARCHAR(50),
    Avatar VARCHAR(50)
);

ALTER TABLE baithi ADD COLUMN img_url VARCHAR(255) AFTER TrangThai;

UPDATE baithi SET img_url = "https://res.cloudinary.com/dyc1c2elf/image/upload/v1714894653/hpz5yqojda1ajpnrpkvv.jpg" where MaBaiThi > -1;

INSERT INTO Admin (UserName, Email, Facebook, Instagram, FirstName, LastName, Pass, Avatar)
VALUES

('admin', 'admin@gmail.com', 'facebook.com/admin', 'instagram.com/admin', 'Admin', 'Admin', '123456', 'admin.jpg');

alter table Admin add column Role_id Varchar(20) after Avatar

update Admin set Role_id = 1 where username = 'admin';

ALTER TABLE ketqua
add ThoiGianLamBai datetime,
add ThoiGianNopBai datetime;


ALTER TABLE ketquatungcau
DROP PRIMARY KEY, 
ADD PRIMARY KEY (MaChiTiet, MaKetQua);

CREATE TABLE Role(
	Id int auto_increment primary key,
    Name varchar(50)
);

CREATE TABLE Permission(
	Id int auto_increment primary key,
    Name varchar(50)
);
use testbtl;
CREATE TABLE thongke (
    idThongKe INT AUTO_INCREMENT PRIMARY KEY,
    LuotXem INT,
    TaiKhoanMoi INT,
    BaiThiMoi INT,
    SoLanLamBaiTheoThang INT,
    ThangNam DATETIME
);




CREATE TABLE HasPermission(
	Id INT AUTO_INCREMENT PRIMARY KEY,
    Role_id INT,
    Permission_id INT,
    FOREIGN KEY (Role_id) REFERENCES Role(Id),
    FOREIGN KEY (Permission_id) REFERENCES Permission(Id)
);

ALTER TABLE Permission ADD column Url VARCHAR(100) AFTER NAME; 


CREATE TABLE Message (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Content VARCHAR(255),
    MSV VARCHAR(100),
    fromAdmin BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (MSV) REFERENCES sinhvien(MSV)
);
