
const db = require("../../../models/index");
const { getAdminWithUsername } = require("../../../services/admin.service")
module.exports.index = async (req, res) => {

    // res.render("user/login.pug", {
    //     titlePage: "Thông tin cá nhân"
    // });
    // const response = {
    //     code: 0,
    //     status: 500,
    //     message: "Truy vấn cơ sở dữ liệu thất bại",
    // };
    // res.status(500).json(response);
    res.render("admin/pages/login/login.pug", {
        titlePage: "Đăng nhập "
    });
};
module.exports.checkLoginAdmin = async (req, res) => {
    const { username, password } = req.body;
    let data = await getAdminWithUsername(username);
    if (data.status != 200) {
        const response = {
            message: "Thông tin tài khoản hoặc mật khẩu không chính xác",
            title: "Thất bại",
        };
        res.render("admin/pages/login/login.pug", {
            data: response
        });
    }

    // ddungs thi lam lam gi do

}