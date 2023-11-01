import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
// import { bcrypt } from "bcryptjs"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const randomString = require("randomstring")
const nodemailer = require("nodemailer")
require("dotenv").config()

const prisma = new PrismaClient()
const secret = "secret"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body)
    if (req.body.email) {
        await prisma.user
            .findUnique({
                where: {
                    email: req.body.email,
                },
            })
            .then((data: any) => {
                console.log("RRRRRRs")
                if (data) {
                    console.log(data)
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
                                    secret,
                                    {
                                        expiresIn: 86400,
                                    },
                                )
                                const token = {
                                    userId: data?.id,
                                    token: userToken,
                                }
                                console.log("token", token)
                                prisma.token
                                    .create({
                                        data: token,
                                    })
                                    .then(token => {
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
                            console.log(err)
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

export async function sendEmail(
    req: NextApiRequest,
    res: NextApiResponse,
    token: any,
    destinataire: string,
) {
    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            //user: "e.vegba@ecoles-epsi.net",
            // user: "melly.lucas@ecoles-epsi.net",
            user: "thibault2399@hotmail.fr",
            pass: process.env.PASSWORD,
        },
    })
    let infoMail = {
        // from: "e.vegba@ecoles-epsi.net",
        // from: "melly.lucas@ecoles-epsi.net",
        from: "thibault2399@hotmail.fr",
        to: destinataire,
        // to: req.body.email,
        subject: "Reset mot de passe",
        text: "Hello world?",
        html: `Cliquer sur ce lien : <a href='http://localhost:3000/resetpassword?token=${token.token}'>reset password</a>`,
    }
    console.log(infoMail)

    transporter.sendMail(infoMail, (err: any) => {
        if (err) {
            return console.log(err)
        } else {
            console.log(`Success`)
        }
    })

    transporter.close()
}
