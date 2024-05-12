const nodemailer = require('nodemailer');
const sendMailTo = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trinhvinhtuandat05102003@gmail.com',
            pass: 'kjgolknrohytwqou'
        }
    });
    const mailOptions = {
        from: 'trinhvinhtuandat05102003@gmail.com',
        to: email,
        subject: 'Mã OTP Xác Thực', // Tiêu đề email
        text: `Bạn đã yêu cầu quên mật khẩu ? Nếu không phải là bạn hãy bỏ qua email này. Không cung cấp cho bất kỳ ai mã xác thực OTP.
                    Mã OTP của bạn là: ${otp}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.log(error);
        }
    });
}
module.exports = sendMailTo