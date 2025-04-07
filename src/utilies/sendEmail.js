import nodemailer from 'nodemailer'

export const sendEmail =async ({ to, subject, html }) => {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zezekhaled13@gmail.com',
            pass: 'ygso hrow snvj vxhi'
        }
    })
    await transpoter.sendMail({
        to,
        from: "'<Brain Tumor>'zezekhaled@gmail.com",
        subject,
        html
    })
}

