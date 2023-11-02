import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body
    console.log(req.body)

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        return res.status(401).json({ message: "L'utilisateur n'existe pas." })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect." })
    }

    const userToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 86400,
        },
    )

    res.status(200).json({ auth: true, user, token: userToken })
}
