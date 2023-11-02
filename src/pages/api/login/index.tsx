import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import cors from "cors"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
import NextCors from "nextjs-cors"

const prisma = new PrismaClient()

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body
    const headersGetOnly = {
        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
    }
    // await NextCors(req, res, {
    //     // Options
    //     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    //     origin: "*",
    //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // })

    // // Rest of the API logic
    // res.json({ message: "Hello NextJs Cors!" })
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
