import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../../prismaClient";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await someDatabaseOperation(async () => {
        const data = await prisma.token.findUnique({
            where: {
                token: req.query.token?.toString(),
            },
        });

        res.status(200).send({
            data: data,
        });
    }).catch((err: any) => {
        res.status(500).send({
            message: err.message || "Some error occurred",
        });
    });
}
