const transporter = require("../config/mail");

const sendEmail = async ({
    to,
    subject,
    html,
    text,
}) => {
    await transporter.sendMail({
        from: `"DevOS" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });
};

module.exports = sendEmail;