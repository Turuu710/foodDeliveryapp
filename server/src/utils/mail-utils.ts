import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import { Resend } from "resend";
configDotenv();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (receiver: string, verifyLink: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
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
};
