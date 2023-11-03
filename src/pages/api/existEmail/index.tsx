import type { NextApiRequest, NextApiResponse } from "next"
import prisma, { someDatabaseOperation } from "../prismaClient"

export default async function existEmail(req: NextApiRequest, res: NextApiResponse) {
    await someDatabaseOperation(() => 
        prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        })
    )
    .then((data: any) => {
        if (req.body.email != "") {
            if (data === null) {
                res.status(200).send({ auth: true })
            } else {
                return res.status(200).send({
                    auth: false,
                    message: "Il y a déjà un compte à cette adresse mail",
                })
            }
        } else {
            return res.status(200).send({ auth: false, message: "Adresse mail obligatoire" })
        }
    })
    .catch(() => {
        return res
            .status(500)
            .send({ auth: false, message: "Il y a déjà un compte à cette adresse mail" })
    })
}
