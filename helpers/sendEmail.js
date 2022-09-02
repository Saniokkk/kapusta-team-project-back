const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465 2255,
    secure: true, 
    auth: {
        user: "kashirin.alexsandr@meta.ua",
        pass: META_PASSWORD
    }
}

const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    try {
        const email = { ...data, from: "kashirin.alexsandr@meta.ua" };
        await transporter.sendMail(email);
        return true; 
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;
