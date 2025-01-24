const nodemailer = require('nodemailer');

const mailConfig = async (msg) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: 'clanguage3289@gmail.com',
            pass: "wgml mpcv ddnm kkbv",
        },
    });

    await transporter.sendMail(msg)
    console.log("Mail Send Success");
}

module.exports = mailConfig;