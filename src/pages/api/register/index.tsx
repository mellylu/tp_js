import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()
const secret = "secret"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await prisma.user
            .create({
                data: req.body,
            })
            .then((data: any) => {
                let userToken = jwt.sign(
                    {
                        id: data.id,
                    },
                    secret,
                    {
                        expiresIn: 86400,
                    },
                )
                return res.status(200).send({ auth: true, data: data, token: userToken })
            })
            .catch((err: any) => {
                return res.status(500).send({ auth: false, message: "Email obligatoire" })
            })
    } else {
        res.status(500).send({ auth: false, message: "Mot de passe obligatoire" })
    }
}

export function existEmail(req: NextApiRequest, res: NextApiResponse) {
    prisma.user
        .findUnique({
            where: {
                email: req.body.email,
            },
        })
        .then((data: any) => {
            if (data === null) {
                res.status(200).send({ auth: true })
            } else {
                return res
                    .status(500)
                    .send({ auth: false, message: "Il y a déjà un compte à cette adresse mail" })
            }
        })
        .catch(() => {
            return res
                .status(500)
                .send({ auth: false, message: "Il y a déjà un compte à cette adresse mail" })
        })
}
