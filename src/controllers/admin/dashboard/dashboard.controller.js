
const db = require("../../../models/index");
const { getAllStatistic, getStudentsWithHighestAverageScore, getViewsPerMonth, laythongkemon } = require("../../../services/statistic.service");
module.exports.index = async (req, res) => {

    var data = await getAllStatistic();
    var data1 = await getViewsPerMonth();
    var data2 = await laythongkemon();
    // console.log(data2.first);
    // console.log(data2.second);
    var data3 = await getStudentsWithHighestAverageScore();

    if (data.status != 200) {
        console.log("Lỗi khi lấy dữ liệu thống kê");
    }
    else {

        res.render("admin/pages/dashboard/index.pug", {
            titlePage: "Đăng nhập ",
            data: data.data.dataValues,
            data1: data1,
            data2: data2,
            data3: data3
        });
    }



};