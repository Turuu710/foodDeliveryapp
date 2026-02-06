import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
const { APP_USER_MAIL, APP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: APP_USER_MAIL,
    pass: APP_PASSWORD,
  },
});

export const sendMail = async (receiver: string, verifyLink: string) => {
  try {
    await transporter.sendMail({
      from: `"Food Delivery"${APP_USER_MAIL}`,
      to: receiver,
      subject: "Verify user",
      html: `<div
    style="
    width: 300px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    text-align: center;
  "
>
  <a href="${verifyLink}">Click to verify your account</a>
</div>
`,
    });
  } catch (error) {
    console.log(error);
  }
};
