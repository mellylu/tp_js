import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../prismaClient";
const bcrypt = require("bcryptjs");

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    let passwordHashed = await bcrypt.hash(req.body.password, 10);
    await someDatabaseOperation(async () => {
        const data = await prisma.user.update({
            where: {
                email: req.body.email,
            },
            data: {
                password: passwordHashed,
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
