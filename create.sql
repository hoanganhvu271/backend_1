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
    MaBaiThi  VARCHAR(50) PRIMARY KEY,
    TenBaiThi VARCHAR(255),
    ThoiGianBatDau DATETIME,
    ThoiGianThi INT,
    SoLuongCau INT,
    TheLoai VARCHAR(50),
    TrangThai VARCHAR(50)
);

-- Tạo bảng Kết quả
CREATE TABLE KetQua (
    MaKetQua  VARCHAR(50) PRIMARY KEY,
    MSV  VARCHAR(50),
    MaBaiThi  VARCHAR(50),
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


CREATE TABLE Admin(
    AdminName Varchar(20) primary key,
    Name Varchar(50),
    Password Varchar(20),
    Email Varchar(30)
)

Insert into Admin values(
	'admin', 'Hoang Anh Vu', '1', 'hoanganhvu271103@gmail.com'
) 
