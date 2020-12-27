const nodeMailer = require('nodemailer');
const adminEmail = 'thaiembinh14@gmail.com';
const adminPassword = '01aibiet';
// Mình sử dụng host của google - gmail
const mailHost = 'smtp.gmail.com';
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587;
const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
});

exports.sendMailRegister= async(receiverEmail,token) => {
    const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: receiverEmail, // địa chỉ gửi đến
        subject: "Nhấn vào đường link sao để đăng nhập", // Tiêu đề của mail
        html: `
        <div>
        <h2>Nhấn vào đường link dưới đây để hoàn thành thủ tục đăng kí nhé<h2>
        <a href="http://localhost:3000/userToken/${token}"><h3>HOÀN THÀNH BƯỚC ĐĂNG KÍ TÀI KHOẢN CỦA BẠN</h3></a>
        </div>
        ` // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    };
    try{
        const result= await transporter.sendMail(options);
        console.log(result);
        return result;
    } catch(err){
        console.log(err);
        return null;
    }
}

exports.sendMailRating = async(receiverEmail,order) => {
    const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: receiverEmail, // địa chỉ gửi đến
        subject: "Cảm ơn quý khách", // Tiêu đề của mail
        html: `
        <div>
        <h2>Cảm ơn bạn đã tin tưởng sử dụng ứng dụng<h2>
        <p> Đơn hàng với id là <strong>${order.order_id}</strong> đã được vận chuyển, vui lòng chú ý điện thoại và đánh giá sản phẩm tại đây nhé</p>
        <a href="http://localhost:3000"><h3>ĐI TỚI TRANG CHỦ ỨNG DỤNG</h3></a>
        </div>
        ` // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    };
}