use javasql

-- Dữ liệu cho bảng SinhVien
INSERT INTO SinhVien (MSV, Ten, Lop, Email, TaiKhoan, MatKhau)
VALUES 
('B21DCCN01', 'Nguyễn Văn A', 'DCCN01', 'nguyenvana@example.com', 'nguyenvana', '1'),
('B21DCCN02', 'Trần Thị B', 'DCCN02', 'tranthib@example.com', 'tranthib', '1'),
('B21DCCN03', 'Lê Văn C', 'DCCN03', 'levanc@example.com', 'levanc', '1'),
('B21DCCN04', 'Phạm Thị D', 'DCCN04', 'phamthid@example.com', 'phamthid', '1'),
('B21DCCN05', 'Hoàng Văn E', 'DCCN05', 'hoangvane@example.com', 'hoangvane', '1'),
('B21DCCN06', 'Đỗ Thị F', 'DCCN06', 'dothif@example.com', 'dothif', '1'),
('B21DCCN07', 'Nguyễn Văn G', 'DCCN07', 'nguyenvang@example.com', 'nguyenvang', '1'),
('B21DCCN08', 'Trần Thị H', 'DCCN08', 'tranthih@example.com', 'tranthih', '1'),
('B21DCCN09', 'Lê Văn I', 'DCCN09', 'levani@example.com', 'levani', '1'),
('B21DCCN10', 'Phạm Thị K', 'DCCN10', 'phamthik@example.com', 'phamthik', '1');

-- Dữ liệu cho bảng BaiThi
INSERT INTO BaiThi (TenBaiThi, ThoiGianBatDau, ThoiGianThi, SoLuongCau, TheLoai, TrangThai)
VALUES 
('Bài thi số 1', '2024-03-28 12:00:00', 30, 4, 'Trắc nghiệm', 'Mở'),
('Bài thi số 2', '2024-03-28 12:00:00', 30, 4, 'Trắc nghiệm', 'Mở'),
('Bài thi số 3', '2024-03-28 12:00:00', 30, 4, 'Trắc nghiệm', 'Mở'),
('Bài thi số 4', '2024-03-29 14:00:00', 40, 5, 'Trắc nghiệm', 'Mở'),
('Bài thi số 5', '2024-03-30 16:00:00', 35, 2, 'Trắc nghiệm', 'Đóng');

-- Dữ liệu cho bảng CauHoi
INSERT INTO CauHoi (MaCauHoi, MaBaiThi, DeBai, SoThuTu, TheLoai)
VALUES 
('C01', 1, 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 1, 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 1, 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C01', 2, 'Câu hỏi số 1', 1, 'Tư luận'),
('C02', 2, 'Câu hỏi số 2', 2, 'Tự luận'),
('C03', 2, 'Câu hỏi số 3', 3, 'Tự luận'),

('C01', 3, 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 3, 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 3, 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C04', 3, 'Câu hỏi số 4', 4, 'Trắc nghiệm'),

('C01', 4, 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 4, 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 4, 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C04', 4, 'Câu hỏi số 4', 4, 'Trắc nghiệm'),
('C05', 4, 'Câu hỏi số 5', 5, 'Trắc nghiệm'),

('C01', 5, 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 5, 'Câu hỏi số 2', 2, 'Trắc nghiệm');

-- Dữ liệu cho bảng LuaChon
INSERT INTO LuaChon (MaCauHoi, MaLuaChon, MaBaiThi, Dung, NoiDung)
VALUES 
-- Bài thi 1:
('C01', 'A', 1, 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 1, 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 1, 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 1, 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 1, 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 1, 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 1, 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 1, 0, 'Đáp án D cho câu hỏi 2'),

-- Bài thi 2
('C01', 'T', 2, 1, 'Đáp án tự luận cho câu hỏi 1'),
('C02', 'T', 2, 1, 'Đáp án tự luận cho câu hỏi 2'),
('C03', 'T', 2, 1, 'Đáp án tự luận cho câu hỏi 3'),

-- Bài thi 3
('C01', 'A', 3, 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 3, 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 3, 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 3, 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 3, 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 3, 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 3, 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 3, 0, 'Đáp án D cho câu hỏi 2'),

('C03', 'A', 3, 0, 'Đáp án A cho câu hỏi 3'),
('C03', 'B', 3, 0, 'Đáp án B cho câu hỏi 3'),
('C03', 'C', 3, 1, 'Đáp án C cho câu hỏi 3'),
('C03', 'D', 3, 0, 'Đáp án D cho câu hỏi 3'),

('C04', 'A', 3, 0, 'Đáp án A cho câu hỏi 4'),
('C04', 'B', 3, 0, 'Đáp án B cho câu hỏi 4'),
('C04', 'C', 3, 0, 'Đáp án C cho câu hỏi 4'),
('C04', 'D', 3, 1, 'Đáp án D cho câu hỏi 4'),

-- Bài thi 4
('C01', 'A', 4, 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 4, 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 4, 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 4, 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 4, 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 4, 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 4, 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 4, 0, 'Đáp án D cho câu hỏi 2'),

('C03', 'A', 4, 0, 'Đáp án A cho câu hỏi 3'),
('C03', 'B', 4, 0, 'Đáp án B cho câu hỏi 3'),
('C03', 'C', 4, 1, 'Đáp án C cho câu hỏi 3'),
('C03', 'D', 4, 0, 'Đáp án D cho câu hỏi 3'),

('C04', 'A', 4, 0, 'Đáp án A cho câu hỏi 4'),
('C04', 'B', 4, 0, 'Đáp án B cho câu hỏi 4'),
('C04', 'C', 4, 0, 'Đáp án C cho câu hỏi 4'),
('C04', 'D', 4, 1, 'Đáp án D cho câu hỏi 4'),

('C05', 'A', 4, 0, 'Đáp án A cho câu hỏi 5'),
('C05', 'B', 4, 0, 'Đáp án B cho câu hỏi 5'),
('C05', 'C', 4, 0, 'Đáp án C cho câu hỏi 5'),
('C05', 'D', 4, 1, 'Đáp án D cho câu hỏi 5'),
-- Bài thi 5
('C01', 'A', 5, 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 5, 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 5, 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 5, 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 5, 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 5, 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 5, 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 5, 0, 'Đáp án D cho câu hỏi 2');


-- Dữ liệu cho bảng KetQua
INSERT INTO KetQua (MaKetQua, MSV, MaBaiThi, Diem)
VALUES 
('KQ01', 'B21DCCN01', 1, 6.7),
('KQ02', 'B21DCCN02', 1, 3.3);


-- Dữ liệu cho bảng KetQuaTungCau
INSERT INTO KetQuaTungCau (MaChiTiet, MaKetQua, MaBaiThi, MaCauHoi, MaLuaChon, Dung)
VALUES 
('CT01', 'KQ01' ,1, 'C01', 'A', 1),
('CT02', 'KQ01',1, 'C02', 'B', 1),
('CT03', 'KQ01',1, 'C03', 'C', 0),
('CT04', 'KQ02',1, 'C01', 'A', 1),
('CT05', 'KQ02' ,1, 'C02', 'B', 0),
('CT06', 'KQ02',1, 'C03', 'C', 0);

INSERT INTO Role(Name)
VALUES
("Admin1"),
("Admin2"),
("Admin3"),
("Admin4");

INSERT INTO Permission(Name)
VALUES
("Tạo tài khoản"),
("Xóa tài khoản"),
("Xem tài khoản"),
("Tạo bài thi"),
("Xóa bài thi"),
("Xem danh sách bài thi"),
("Xem thống kê kết quả"),
("Làm bài thi"),
("Cấp quyền");



INSERT INTO HasPermission(Role_id, Permission_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9)







