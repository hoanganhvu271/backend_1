const db = require("../models/index");

const getStatisticById = async (id) => {
    var data = { status: null, data: null };
    try {
        const results = await db.Result.findAll({
            where: {
                MaBaiThi: id
            },
            raw: true
        });

        const test = await db.Test.findOne({
            where: { MaBaiThi: id },
            attributes: ['TenBaiThi', 'ThoiGianBatDau', 'TheLoai']
        })

        const students = []


        contestants = results.length
        if (results.length > 0) {
            var total = 0;
            var rangeOfPoint = new Array(10).fill(0);

            for (var i = 0; i < results.length; i++) {
                total += results[i].Diem
                rangeOfPoint[parseInt(results[i].Diem)] += 1
                var student = await db.Student.findAll({
                    where: {
                        MSV: results[i].MSV
                    },
                    attributes: ['MSV', 'Ten'],
                })
                student.point = results[i].Diem
                students.push(student)
            }
            var average = total / contestants
            students.sort((a, b) => b.point - a.point);

            data.status = 200
            data.data = {
                test: test,
                contestants: contestants,
                average: average,
                rangeOfPoint: rangeOfPoint,
                ranking: students

            }
            return data
        }
        else {
            data.status = 404
            return data
        }



    } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu:", error);
        data.status = 500
        return data;
    }
}

module.exports = { getStatisticById }