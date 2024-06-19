import nodemailer from 'nodemailer';

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
              },
        })

        console.log("After transported created ", process.env.EMAIL_ID  );
        console.log("Passs:",process.env.EMAIL_PASS );

        await transporter.sendMail({
            from: "dhiyaneshsasi03@gmail.com" ,
            to: email,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully !!");
    } catch (error) {
        console.log("Email not sent ", error);
    }
};

export default  sendEmail;
