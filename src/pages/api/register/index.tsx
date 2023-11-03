import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../prismaClient";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await someDatabaseOperation(async () => {
        const data = await prisma.user.create({
            data: req.body,
        });

        let userToken = jwt.sign(
            {
                id: data.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400,
            },
        );

        return res.status(200).send({ auth: true, data: data, token: userToken });
    }).catch((err: any) => {
        return res.status(500).send({ auth: false, message: "Erreur base de données" });
    });
}
