import nodemailer, { Transporter } from 'nodemailer';
import { FreelancerRepositoryImpl } from '../repositories/freelancerRepositoryImpl';
const freelancerRepository = new FreelancerRepositoryImpl()


export class MailServices {
    // public transporter: Transporter;
    async sendOtp(email: string, otp: number): Promise<void> {

        console.log(email,otp);
        

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: process.env.SENDER_MAIL,
              pass: process.env.OTP_KEY,
            },
            tls: {
              rejectUnauthorized: false
          }
          });

          const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "For veryfication email",
            html: `<h1>${otp}</h1>`,
          };

          console.log(`OTP is : ${otp}`);
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email ented ", info.response);
              setTimeout(() => {
                freelancerRepository.clearOTP(email)
                console.log(`${email} OTP Expired`);
                
              }, 50000);
            }
          });
    }

}
