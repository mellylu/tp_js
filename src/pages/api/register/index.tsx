import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from "next"
// import { bcrypt } from "bcryptjs"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const prisma = new PrismaClient()
const secret = "secret"

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(req.body)

    // console.log("usertoken", userToken)
    await prisma.user
        .create({
            data: req.body,
        })
        .then((data: any) => {
            console.log(data)
            let userToken = jwt.sign(
                {
                    id: data.id,
                },
                secret,
                {
                    expiresIn: 86400,
                },
            )
            return res.status(200).send({ auth: true, data: data, token: userToken })
        })
        .catch((err: any) => {
            console.log(err)
        })
}
