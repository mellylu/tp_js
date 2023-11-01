import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()
const secret = "secret"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body
   console.log(req.body)

    //console.log(" requete de connexion lancé par :", email);

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.log("L'utilisateur n'existe pas.")
        return res.status(401).json({ message: "L'utilisateur n'existe pas." })
    }

    //console.log("Utilisateur :", user);

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        console.log("Mot de passe incorrect.")
        return res.status(401).json({ message: "Mot de passe incorrect." })
    }

    // console.log("Mot de passe correct.");

    const userToken = jwt.sign(
        {
            id: user.id,
        },
        secret,
        {
            expiresIn: 86400, // durée de validité du token
        },
    )

    // console.log("Token JWT généré :", userToken);

    res.status(200).json({ auth: true, user, token: userToken })
}
