const db = require("../models/index");
const { Sequelize } = require("sequelize");
const getViewsPerMonth = async () => {
    var data = { status: null, first: null, second: null };
    try {
        const viewsPerMonth = await db.thongke.findAll({
            attributes: [
                [db.sequelize.fn('MONTH', db.sequelize.col('ThangNam')), 'Thang'],
                [db.sequelize.fn('SUM', db.sequelize.col('LuotXem')), 'TongLuotXem']
            ],
            group: [db.sequelize.fn('MONTH', db.sequelize.col('ThangNam'))]
        });


        var first = [];
        var second = []
        for (var i = 0; i < viewsPerMonth.length; i++) {
            first.push(viewsPerMonth[i].dataValues.Thang);
            second.push(viewsPerMonth[i].dataValues.TongLuotXem);
        }


        data.status = 200;
        data.first = first;
        data.second = second;
        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        return { status: 500, data: null };
    }
}

const laythongkemon = async () => {
    var data = { status: null, first: null, second: null };
    try {
        // Lấy danh sách thể loại và số lượng của mỗi thể loại
        const categoriesAndCounts = await db.Test.findAll({
            attributes: ['TheLoai', [db.sequelize.fn('COUNT', 'TheLoai'), 'SoLuong']],
            group: ['TheLoai']
        });
        data.status = 200;
        // Assumed that tests is an array containing Test objects

        // Lấy các giá trị SoLuong và TheLoai từ mỗi đối tượng Test
        var first = [];
        var second = [];
        for (var i = 0; i < categoriesAndCounts.length; i++) {
            first.push(categoriesAndCounts[i].dataValues.TheLoai);
            second.push(categoriesAndCounts[i].dataValues.SoLuong);
        }
        data.first = first;
        data.second = second;
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
}

// viết cho tôi hàm có tác dụng là lấy tất cả dữ liệu từ model thống kê, sau đó trả về dữ liệu đó
const getAllStatistic = async () => {
    var data = { status: null, data: null };
    try {
        const totalData = await db.thongke.findOne({
            attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('LuotXem')), 'TongLuotXem'],
                [db.sequelize.fn('SUM', db.sequelize.col('TaiKhoanMoi')), 'TongTaiKhoanMoi'],
                [db.sequelize.fn('SUM', db.sequelize.col('BaiThiMoi')), 'TongBaiThiMoi'],
                [db.sequelize.fn('SUM', db.sequelize.col('SoLanLamBaiTheoThang')), 'TongSoLanLamBaiTheoThang']
            ]
        });
        data.status = 200;
        data.data = totalData;

        return data;
    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500;
        return data;
    }

}

const getStudentsWithHighestAverageScore = async () => {
    try {
        const highestAverageScoreStudents = await db.Result.findAll({
            attributes: [
                'MSV',
                [Sequelize.fn('AVG', Sequelize.col('Diem')), 'averageScore']
            ],
            group: ['MSV'],
            order: [[Sequelize.literal('averageScore'), 'DESC']],
            include: [{
                model: db.Student,
                attributes: ['Ten', 'Lop'] // Chọn các trường thông tin sinh viên cần hiển thị
            }]
        });
        return highestAverageScoreStudents;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        throw error;
    }
}

module.exports = { getStudentsWithHighestAverageScore, getAllStatistic, getViewsPerMonth, laythongkemon }