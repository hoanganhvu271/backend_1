const db = require("../../models/index");

const bcrypt = require('bcrypt')
const { getStudentById, createNewStudent, getStudentByEmail, updatePassword } = require("../../services/student.service");
const { student } = require("./result/result.controller");
const sendMailTo = require("../../middleware/sendEmail");
global.otpData = {};
module.exports.index = async (req, res) => {

    // res.render("user/login.pug", {
    //     titlePage: "Thông tin cá nhân"
    // });
    res.render("user/login.pug", {
        titlePage: "Thông tin cá nhân"
    });
};
module.exports.forgotPassword_index = async (req, res) => {
    res.render("user/forgotPassword.pug");
}
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    let data = await getStudentByEmail(email);
    if (data.status != 200) {
        const response = {
            message: "Email này chưa được đăng ký tài khoản, hãy đăng ký",
            title: "Thất bại",
        };

        res.render("user/forgotPassword.pug", {
            data: response,
        });
    }
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
    }
    const otp = generateOTP();
    global.otpData = { email, otp };
    await sendMailTo(email, otp);
    res.render("user/verifyOTP.pug");
}

module.exports.verifyOTP = async (req, res) => {


    let newotp = await (req.body.digit1 + req.body.digit2 + req.body.digit3 + req.body.digit4 + req.body.digit5 + req.body.digit6);
    console.log(newotp);
    // Lấy email và mã OTP đã lưu trữ
    const { email, otp } = await global.otpData;
    console.log(otp);
    // Kiểm tra xem mã OTP được nhập có trùng khớp với mã OTP đã lưu trữ hay không
    if (otp.toString() === newotp) {
        // Mã OTP hợp lệ, tiếp tục xử lý
        // res.status(200).json({ message: 'Xác thực thành công.' });
        res.render("user/changePassword.pug");
    } else {
        const response = {
            message: "OTP không hợp lệ, hãy thử lại",
            title: "Thất bại",
        };

        res.render("user/verifyOTP.pug", {
            data: response,
        });

    }
}

module.exports.resendOTP = async (req, res) => {
    const { email, otp } = global.otpData;
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
    }
    const newotp = generateOTP();
    await sendMailTo(email, newotp);
    res.render("user/verifyOTP.pug");
}
module.exports.changePassword = async (req, res) => {
    // nhớ chỉnh email thành khóa chính
    const { newPassword, confirmPassword } = req.body;
    const { email, otp } = global.otpData;
    try {
        // Kiểm tra xem mật khẩu mới và mật khẩu xác nhận có khớp nhau không
        if (newPassword !== confirmPassword) {

            const response = {
                message: "Mật khẩu không trùng khớp, hãy thử lại",
                title: "Thất bại",
            };

            res.render("user/changePassword.pug", {
                data: response,
            });


        }
        else {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu mới trong cơ sở dữ liệu
            await updatePassword(email, hashedPassword);

            res.render("user/changePasswordsuccess.pug");
        }


    } catch (error) {
        console.error('Lỗi khi thay đổi mật khẩu:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thay đổi mật khẩu.' });
    }
}

module.exports.register = async (req, res) => {

    res.render("user/register.pug");
};
module.exports.checkLoginUser = async (req, res) => {


    // nhớ xử lý trường hợp nhập vào toàn ký tự rỗng
    let data = await getStudentById(req.body.msv);
    // const response = {
    //     code: 1,
    //     status: 200,
    //     message: "successfully",
    //     data: data.data,
    // }
    // res.status(200).json(response);


    if (data.status === 200) {
        var ok = await bcrypt.compareSync(req.body.password, data.data[0].MatKhau);
        if (ok) {


            const response = {
                code: 1,
                status: 200,
                message: "successfully",
                data: data.data,
            }
            res.status(200).json(response);

            // phần này chờ code từ Hiệp
        }
    }

    const response = {
        title: "Đăng nhập thất bại",
        message: 'Thông tin tài khoản hoặc mật khẩu không chính xác'
    };
    res.render("user/login.pug", {
        data: response,
    });


}
module.exports.createUser = async (req, res) => {
    let student = req.body;
    if (!req.body.msv || !req.body.class || !req.body.name || !req.body.email || !req.body.password) {
        res.render("user/register.pug", {
            data: {
                title: "Đăng ký thất bại",
                message: 'Vui lòng điền đầy đủ thông tin'
            },
        });
        return;
    }
    const data = await getStudentByEmail(student.email);
    if (data.status === 200) {
        res.render("user/register.pug", {
            data: {
                title: "Đăng ký thất bại",
                message: 'Email đã tồn tại'
            },
        });
        return;
    }
    var status = await createNewStudent(student);
    if (status === 1) {
        res.render("user/successRegister.pug")
    }
    else {

        const response = {
            title: "Đăng ký thất bại",
            message: 'Sinh viên này đã tồn tại'
        }
        res.render("user/register.pug", {
            data: response,
        });
    }


}




