import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    await prisma.token
        .findUnique({
            where: {
                token: req.body.token,
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
