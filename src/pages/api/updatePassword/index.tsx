import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../prismaClient"
const bcrypt = require("bcryptjs")

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    let passwordHashed = await bcrypt.hash(req.body.password, 10)
    await prisma.user
        .update({
            where: {
                email: req.body.email,
            },
            data: {
                password: passwordHashed,
            },
        })
        .then((data: any) => {
            res.status(200).send({
                data: data,
            })
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occured",
            })
        })
}
