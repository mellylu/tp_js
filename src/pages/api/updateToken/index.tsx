import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../prismaClient"

const jwt = require("jsonwebtoken")
const randomString = require("randomstring")
const nodemailer = require("nodemailer")
require("dotenv").config()

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
                                res.status(200).send({
                                    success: true,
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
                                        res.status(200).send({
                                            success: true,
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
