
const db = require("../../../models/index");

module.exports.index = async (req, res) => {


    res.render("admin/pages/dashboard/index.pug", {
        titlePage: "Đăng nhập "
    });
};