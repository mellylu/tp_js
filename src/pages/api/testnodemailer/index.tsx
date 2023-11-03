import type { NextApiRequest, NextApiResponse } from "next"
const nodemailer = require("nodemailer")
require("dotenv").config()

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "melly.lucas32@gmail.com",
            //user: "corentindu77220@gmail.com",
            pass: process.env.PASSWORD,
        },
        secure: true,
    })

    await new Promise((resolve, reject) => {
        transporter.verify(function (error: any, success: any) {
            if (error) {
                reject(error)
            } else {
                resolve(success)
            }
        })
    })

    const mailData = {
        from: "melly.lucas32@gmail.com",
        to: req.body.email,
        subject: `Email de réinitialisation de Alain Terrieur`,
        text: "Hello world?",
        html: `
                <div style="font-family: Arial, sans-serif;">
                    <p>Bonjour,</p>
                    <p>Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :</p>
                    <p><a href='${req.body.url}/resetpassword?token=${req.body.token}'>Réinitialiser le mot de passe</a></p>
                    <p>Cordialement,</p>
                    <p>L'équipe Alain Terrieur</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRliUbaqpq6O6XkWRrJFx1uCctSB6ImpARfYA&usqp=CAU" alt="Logo Alain Terrieur" style="width: 150px;">
                </div>
            `,
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }
        })
    })

    res.status(200).json({ status: "OK" })
}
