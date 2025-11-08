import nodemailer from "nodemailer"
import { verificationMail } from "../mailTemplates/mailTemplate.js"


const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

export const sendMail = async ({ toMail, subject, token }) => {
  const mailOptions = {
    from: "nathanael.halvorson53@ethereal.email",
    to: toMail,
    subject,
    html: verificationMail(toMail, token)
  }

  try {
    await transport.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("failed to send email: ", error)
    return false
  }
}