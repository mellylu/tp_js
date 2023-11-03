import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const randomString = require("randomstring")
const nodemailer = require("nodemailer")
const { Resend } = require("resend")
require("dotenv").config()
const resend = new Resend("re_d3krzAaU_48Jqhtntgrms9Hkmcysfq5pP")

const prisma = new PrismaClient()

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.email) {
        await prisma.user
            .findUnique({
                where: {
                    email: req.body.email,
                },
            })
            .then((data: any) => {
                if (data) {
                    prisma.token
                        .findUnique({
                            where: {
                                userId: data.id,
                            },
                        })
                        .then(async (token: any) => {
                            if (token) {
                                // await sendEmail(req, res, token, req.body.email, req.headers.origin)
                                res.status(200).send({
                                    success: true,
                                    // message: "Email sended",
                                    token: token,
                                    email: data?.email,
                                })
                            } else {
                                const userToken = jwt.sign(
                                    {
                                        hash: randomString.generate(100),
                                    },
                                    process.env.JWT_SECRET,
                                    {
                                        expiresIn: 86400,
                                    },
                                )
                                const token = {
                                    userId: data?.id,
                                    token: userToken,
                                }
                                prisma.token
                                    .create({
                                        data: token,
                                    })
                                    .then((token: any) => {
                                        //sendEmail(
                                        //     req,
                                        //     res,
                                        //     token,
                                        //     req.body.email,
                                        //     req.headers.origin,
                                        // )
                                        res.status(200).send({
                                            success: true,
                                            // message: "Email sended",
                                            email: data?.email,
                                            token: token,
                                        })
                                    })
                                    .catch(err => {
                                        res.status(401).send({
                                            success: false,
                                            message: "erreur autre",
                                        })
                                    })
                            }
                        })
                        .catch((err: any) => {
                            res.status(401).send({
                                success: false,
                                message: "Eepp",
                            })
                        })
                } else {
                    res.status(201).send({
                        success: true,
                        message: "User not found",
                    })
                }
            })
            .catch((err: any) => {
                res.status(401).send({
                    success: false,
                    message: "Error has occured",
                })
            })
    } else {
        res.status(400).send({
            success: false,
            message: "Missing data",
        })
    }
}

// export async function sendEmail(
//     req: NextApiRequest,
//     res: NextApiResponse,
//     token: any,
//     destinataire: string,
// ) {
//     // Send an email:
//     const client = new postmark.ServerClient("29152891-db52-4fbd-ab97-bcef52529d54")

//     await client.sendEmail({
//         From: "melly.lucas32@ecoles-epsi.net",
//         To: "melly.lucas@ecoles-epsi.net",
//         Subject: "Test",
//         TextBody: "Hello from Postmark!",
//     })
// }
// export async function sendEmail(
//     req: NextApiRequest,
//     res: NextApiResponse,
//     token: any,
//     destinataire: string,
//     url: any,
// ) {
//     let testAccount = await nodemailer.createTestAccount()
//     // console.log(req)

//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com", // hostname
//         secureConnection: false, // TLS requires secureConnection to be false
//         port: 587, // port for secure SMTP
//         auth: {
//             user: "melly.lucas32@gmail.com",
//             pass: "Moustache988",
//         },
//         tls: {
//             ciphers: "SSLv3",
//         },
//         // host: "smtp-mail.outlook.com",
//         // port: 587,
//         // service: "Outlook",
//         // auth: {
//         //     user: "thibault2399@hotmail.fr",
//         //     pass: process.env.PASSWORD,
//         // },
//         // secure: true,
//     })
//     let infoMail = {
//         from: "thibault2399@hotmail.fr",
//         to: destinataire,
//         subject: "Reset mot de passe",
//         text: "Hello world?",
//         html: `Cliquer sur ce lien : <a href='${url}/resetpassword?token=${token.token}'>reset password</a>`,
//     }

//     await transporter.sendMail(infoMail, (err: any) => {
//         if (err) {
//             return res.status(500).send({ sendEmail: false, message: err })
//         } else {
//         }
//     })

//     transporter.close()
// }

//

/* export const sendEmail = async (
    req: NextApiRequest,
    res: NextApiResponse,
    token: any,
    destinataire: string,
    url: any,
) => {
    console.log("============== Email init ===============")
    console.log(destinataire)
    // await resend.emails.send({
    //     from: "melly.lucas32@yahoo.fr", // sender address
    //     to: destinataire, // list of receivers
    //     subject: "Reset mot de passe",
    //     text: "Hello world?",
    //     html: `Cliquer sur ce lien : <a href='${url}/resetpassword?token=${token.token}'>reset password</a>`,
    // })

    const CONNECT_NODEMAILER = {
        user: "melly.lucas32@gmail.com",
        pass: process.env.PASSWORD,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
    }

    let transporter = nodemailer.createTransport({
        host: CONNECT_NODEMAILER.host,
        port: CONNECT_NODEMAILER.port,
        secure: CONNECT_NODEMAILER.secure, // true for 465, false for other ports
        auth: {
            user: CONNECT_NODEMAILER.user, // generated ethereal user
            pass: CONNECT_NODEMAILER.pass, // generated ethereal password
        },
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "melly.lucas32@gmail.com", // sender address
        to: destinataire, // list of receivers
        subject: "Reset mot de passe",
        text: "Hello world?",
        html: `Cliquer sur ce lien : <a href='${url}/resetpassword?token=${token.token}'>reset password</a>`,
    })

    console.log("============== Email envoyés ===============")

    return true
} */

export const sendEmail = async (
    req: NextApiRequest,
    res: NextApiResponse,
    token: any,
    destinataire: string,
    url: any,
) => {
    console.log("============== Email init ===============")

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        // service: "gmail",
        auth: {
            user: "melly.lucas32@gmail.com",
            //user: "corentindu77220@gmail.com",
            pass: process.env.PASSWORD,
        },
        secure: true,
        // tls: {
        //     rejectUnauthorized: false,
        // },
    })

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error: any, success: any) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log("Server is ready to take our messages")
                resolve(success)
            }
        })
    })
    console.log(destinataire)
    console.log(url)

    const mailData = {
        from: "melly.lucas32@gmail.com",
        to: destinataire,
        subject: `form message`,
        text: "Hello world?",
        html: `Cliquer sur ce lien : <a href='${url}/resetpassword?token=${token.token}'>reset password</a>`,
    }

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) {
                console.error(err)
                reject(err)
            } else {
                console.log(info, "info")
                resolve(info)
            }
        })
    })

    res.status(200).json({ status: "OK" })

    console.log("============== Email envoyés ===============")
}
