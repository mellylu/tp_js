import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const nodemailer = require("nodemailer")
const { Resend } = require("resend")
require("dotenv").config()
const resend = new Resend("re_d3krzAaU_48Jqhtntgrms9Hkmcysfq5pP")

const prisma = new PrismaClient()

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    console.log("============== Email init ===============")
    // console.log(req.body)
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

    const mailData = {
        from: "melly.lucas32@gmail.com",
        to: req.body.email,
        subject: `form message`,
        text: "Hello world?",
        html: "Cliquer sur ce lien",
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
