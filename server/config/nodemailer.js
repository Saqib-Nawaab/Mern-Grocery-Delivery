import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user:process.env.USER_EMAIL,
      pass:process.env.USER_PASS,
      // user: "",
      // pass: "", 
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  const mailOptions = {
    to: options.userEmail,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default sendEmail
