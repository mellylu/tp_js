import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.token
        .findUnique({
            where: {
                token: req.query.token?.toString(),
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