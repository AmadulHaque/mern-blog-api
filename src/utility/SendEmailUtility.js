var nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    // let transporter = nodemailer.createTransport({
    //     host: 'mail.teamrabbil.com',
    //     port: 25,
    //     secure: false,
    //     auth: {
    //         user: "info@teamrabbil.com",
    //         pass: '~sR4[bhaC[Qs'
    //     },tls: {
    //         rejectUnauthorized: false
    //     },
    // });

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "2475136fc599c8",
            pass: "83194eaae9969e"
        }
    });

    let mailOptions = {
        from: 'Inventory <info@amdad.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)

}
module.exports=SendEmailUtility