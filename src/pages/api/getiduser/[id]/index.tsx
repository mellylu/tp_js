import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../../prismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await someDatabaseOperation(() => 
        prisma.user.findUnique({
            where: {
                id: Number(req.query.id),
            },
        })
    )
    .then((data: any) => {
        return res.status(200).send({ user: true, content: data });
    })
    .catch(() => {
        return res
            .status(500)
            .send({ user: false, message: "Aucun user ne possède cet identifiant" });
    })
}
