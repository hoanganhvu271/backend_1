// [GET] /admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/viewResult/index.pug", {
    titlePage: "Thông tin cá nhân",
  });
};
