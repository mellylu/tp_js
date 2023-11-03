import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../prismaClient";

const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
require("dotenv").config();

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.email) {
        await someDatabaseOperation(async () => {
            const data = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                },
            });

            if (data) {
                const token = await prisma.token.findUnique({
                    where: {
                        userId: data.id,
                    },
                });

                if (token) {
                    res.status(200).send({
                        success: true,
                        token: token,
                        email: data?.email,
                    });
                } else {
                    const userToken = jwt.sign(
                        {
                            hash: randomString.generate(100),
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 86400,
                        }
                    );
                    const newToken = {
                        userId: data?.id,
                        token: userToken,
                    };
                    const createdToken = await prisma.token.create({
                        data: newToken,
                    });
                    res.status(200).send({
                        success: true,
                        email: data?.email,
                        token: createdToken,
                    });
                }
            } else {
                res.status(201).send({
                    success: true,
                    message: "User not found",
                });
            }
        }).catch((err: any) => {
            res.status(401).send({
                success: false,
                message: "Error has occured",
            });
        });
    } else {
        res.status(400).send({
            success: false,
            message: "Missing data",
        });
    }
}
