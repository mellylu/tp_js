import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
// import { bcrypt } from "bcryptjs"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const randomString = require("randomstring")

const prisma = new PrismaClient()
const secret = "secret"

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
                    console.log(data)
                    prisma.token
                        .findUnique({
                            where: {
                                userId: data.id,
                            },
                        })
                        .then((token: any) => {
                            if (token) {
                                //sendEmail.sendEmail(req, res, token, req.body.email)
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
                                        //sendEmail.sendEmail(req, res, token, req.body.email)
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
