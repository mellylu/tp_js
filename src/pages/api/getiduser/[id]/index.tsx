import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await prisma.user
        .findUnique({
            where: {
                id: Number(req.query.id),
            },
        })
        .then((data: any) => {
            return res.status(200).send({ user: true, content: data })
        })

        .catch(() => {
            return res
                .status(500)
                .send({ user: false, message: "Aucun user ne possède cet identifiant" })
        })
}
