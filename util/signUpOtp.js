const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const OTP = require('../models/otp.model');
const hbs = require('nodemailer-express-handlebars')

const signUpOtp = async (req,res) => {
    const { email } = req.body;
    // console.log("email:", email)
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }

    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });

    try {
        await OTP.create({ email, otp });

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
        const hbsOptions ={
            viewEngine:{
                partialsDir:'views',
                layoutsDir:'views',
                defaultLayout:''
            },
            viewPath:'views'
        }
        transporter.use('compile', hbs(hbsOptions))
        function sendMail(to,subject,template,context){
            const mailOptions = {
                from: "recruit@crestwood.co.ke",
                to,
                subject,
                template,
                context
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send("Error sending OTP");
                } else {
                    console.log("Email sent:", info.response);
                    res.status(200).send("OTP sent successfully");
                }
            });
            
        }
        sendMail(email, "User verification", "userOtpVerification", {otp:otp})
        return otp;
    } catch (error) {
        console.error("Error creating OTP:", error);
        return res.status(500).send("Error sending OTP");
    }
}

module.exports = signUpOtp;
