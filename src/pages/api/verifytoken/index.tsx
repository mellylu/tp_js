const jwt = require("jsonwebtoken")
const secret = "secret"
import type { NextApiRequest, NextApiResponse } from "next"

export default function verifyToken(req: NextApiRequest, res: NextApiResponse) {
    let token = req.headers.authorization
    if (!token) {
        return res.status(403).send({
            auth: false,
            token: null,
            message: "Missing token",
        })
    }
    jwt.verify(token, secret, function (error: any, jwtdecoded: any) {
        if (error) {
            return res.status(401).send({
                auth: false,
                token: null,
                message: "not authorized",
            })
        }
        return res.status(200).send({
            auth: true,
            jwt: jwtdecoded,
        })
    })
}
