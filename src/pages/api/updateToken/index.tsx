import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const randomString = require("randomstring")
const nodemailer = require("nodemailer")
const postmark = require("postmark")
require("dotenv").config()

const prisma = new PrismaClient()

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body.email)
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
                        .then((token: any) => {
                            if (token) {
                                sendEmail(req, res, token, req.body.email)
                                res.status(200).send({
                                    success: true,
                                    message: "Email sended",
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
                                        sendEmail(req, res, token, req.body.email)
                                        res.status(200).send({
                                            success: true,
                                            message: "Email sended",
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
export async function sendEmail(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any,
    destinataire: string,
) {
    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        service: "Outlook",
        auth: {
            user: "thibault2399@hotmail.fr",
            pass: process.env.PASSWORD,
        },
        // secure: true,
    })

    let infoMail = {
        from: "thibault2399@hotmail.fr",
        to: destinataire,
        subject: "Reset mot de passe",
        text: "Hello world?",
        html: `Cliquer sur ce lien : <a href='http://localhost:3000/resetpassword?token=${token.token}'>reset password</a>`,
    }

    await transporter.sendMail(infoMail, (err: any) => {
        if (err) {
            return res.status(500).send({ sendEmail: false, message: err })
        } else {
        }
    })

    transporter.close()
}
