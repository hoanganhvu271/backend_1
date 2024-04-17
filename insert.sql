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
INSERT INTO BaiThi (MaBaiThi, TenBaiThi, ThoiGianBatDau, ThoiGianThi, SoLuongCau, TheLoai, TrangThai)
VALUES 
('BT01', 'Bài thi số 1', '2024-03-26 08:00:00', 60, 2, 'Trắc nghiệm', 'Mở'),
('BT02', 'Bài thi số 2', '2024-03-27 10:00:00', 45, 3, 'Tự luận', 'Đóng'),
('BT03', 'Bài thi số 3', '2024-03-28 12:00:00', 30, 4, 'Trắc nghiệm', 'Mở'),
('BT04', 'Bài thi số 4', '2024-03-29 14:00:00', 40, 5, 'Trắc nghiệm', 'Mở'),
('BT05', 'Bài thi số 5', '2024-03-30 16:00:00', 35, 2, 'Trắc nghiệm', 'Đóng');

-- Dữ liệu cho bảng CauHoi
INSERT INTO CauHoi (MaCauHoi, MaBaiThi, DeBai, SoThuTu, TheLoai)
VALUES 
('C01', 'BT01', 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 'BT01', 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 'BT01', 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C01', 'BT02', 'Câu hỏi số 1', 1, 'Tư luận'),
('C02', 'BT02', 'Câu hỏi số 2', 2, 'Tự luận'),
('C03', 'BT02', 'Câu hỏi số 3', 3, 'Tự luận'),

('C01', 'BT03', 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 'BT03', 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 'BT03', 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C04', 'BT03', 'Câu hỏi số 4', 4, 'Trắc nghiệm'),

('C01', 'BT04', 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 'BT04', 'Câu hỏi số 2', 2, 'Trắc nghiệm'),
('C03', 'BT04', 'Câu hỏi số 3', 3, 'Trắc nghiệm'),
('C04', 'BT04', 'Câu hỏi số 4', 4, 'Trắc nghiệm'),
('C05', 'BT04', 'Câu hỏi số 5', 5, 'Trắc nghiệm'),

('C01', 'BT05', 'Câu hỏi số 1', 1, 'Trắc nghiệm'),
('C02', 'BT05', 'Câu hỏi số 2', 2, 'Trắc nghiệm');

-- Dữ liệu cho bảng LuaChon
INSERT INTO LuaChon (MaCauHoi, MaLuaChon, MaBaiThi, Dung, NoiDung)
VALUES 
-- Bài thi 1:
('C01', 'A', 'BT01', 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 'BT01', 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 'BT01', 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 'BT01', 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 'BT01', 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 'BT01', 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 'BT01', 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 'BT01', 0, 'Đáp án D cho câu hỏi 2'),

-- Bài thi 2
('C01', 'T', 'BT02', 1, 'Đáp án tự luận cho câu hỏi 1'),
('C02', 'T', 'BT02', 1, 'Đáp án tự luận cho câu hỏi 2'),
('C03', 'T', 'BT02', 1, 'Đáp án tự luận cho câu hỏi 3'),

-- Bài thi 3
('C01', 'A', 'BT03', 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 'BT03', 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 'BT03', 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 'BT03', 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 'BT03', 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 'BT03', 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 'BT03', 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 'BT03', 0, 'Đáp án D cho câu hỏi 2'),

('C03', 'A', 'BT03', 0, 'Đáp án A cho câu hỏi 3'),
('C03', 'B', 'BT03', 0, 'Đáp án B cho câu hỏi 3'),
('C03', 'C', 'BT03', 1, 'Đáp án C cho câu hỏi 3'),
('C03', 'D', 'BT03', 0, 'Đáp án D cho câu hỏi 3'),

('C04', 'A', 'BT03', 0, 'Đáp án A cho câu hỏi 4'),
('C04', 'B', 'BT03', 0, 'Đáp án B cho câu hỏi 4'),
('C04', 'C', 'BT03', 0, 'Đáp án C cho câu hỏi 4'),
('C04', 'D', 'BT03', 1, 'Đáp án D cho câu hỏi 4'),

-- Bài thi 4
('C01', 'A', 'BT04', 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 'BT04', 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 'BT04', 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 'BT04', 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 'BT04', 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 'BT04', 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 'BT04', 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 'BT04', 0, 'Đáp án D cho câu hỏi 2'),

('C03', 'A', 'BT04', 0, 'Đáp án A cho câu hỏi 3'),
('C03', 'B', 'BT04', 0, 'Đáp án B cho câu hỏi 3'),
('C03', 'C', 'BT04', 1, 'Đáp án C cho câu hỏi 3'),
('C03', 'D', 'BT04', 0, 'Đáp án D cho câu hỏi 3'),

('C04', 'A', 'BT04', 0, 'Đáp án A cho câu hỏi 4'),
('C04', 'B', 'BT04', 0, 'Đáp án B cho câu hỏi 4'),
('C04', 'C', 'BT04', 0, 'Đáp án C cho câu hỏi 4'),
('C04', 'D', 'BT04', 1, 'Đáp án D cho câu hỏi 4'),

('C05', 'A', 'BT04', 0, 'Đáp án A cho câu hỏi 5'),
('C05', 'B', 'BT04', 0, 'Đáp án B cho câu hỏi 5'),
('C05', 'C', 'BT04', 0, 'Đáp án C cho câu hỏi 5'),
('C05', 'D', 'BT04', 1, 'Đáp án D cho câu hỏi 5'),
-- Bài thi 5
('C01', 'A', 'BT05', 1, 'Đáp án A cho câu hỏi 1'),
('C01', 'B', 'BT05', 0, 'Đáp án B cho câu hỏi 1'),
('C01', 'C', 'BT05', 0, 'Đáp án C cho câu hỏi 1'),
('C01', 'D', 'BT05', 0, 'Đáp án D cho câu hỏi 1'),

('C02', 'A', 'BT05', 0, 'Đáp án A cho câu hỏi 2'),
('C02', 'B', 'BT05', 1, 'Đáp án B cho câu hỏi 2'),
('C02', 'C', 'BT05', 0, 'Đáp án C cho câu hỏi 2'),
('C02', 'D', 'BT05', 0, 'Đáp án D cho câu hỏi 2');


-- Dữ liệu cho bảng KetQua
INSERT INTO KetQua (MaKetQua, MSV, MaBaiThi, Diem)
VALUES 
('KQ01', 'B21DCCN01', 'BT01', 6.7),
('KQ02', 'B21DCCN02', 'BT01', 3.3);


-- Dữ liệu cho bảng KetQuaTungCau
INSERT INTO KetQuaTungCau (MaChiTiet, MaKetQua, MaBaiThi, MaCauHoi, MaLuaChon, Dung)
VALUES 
('CT01', 'KQ01' ,'BT01', 'C01', 'A', 1),
('CT02', 'KQ01','BT01', 'C02', 'B', 1),
('CT03', 'KQ01','BT01', 'C03', 'C', 0),
('CT04', 'KQ02','BT01', 'C01', 'A', 1),
('CT05', 'KQ02' ,'BT01', 'C02', 'B', 0),
('CT06', 'KQ02','BT01', 'C03', 'C', 0);



