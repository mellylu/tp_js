// // exécution des requêtes avec prisma
// // import { PrismaClient } from "@prisma/client"
// const { PrismaClient } = require("@prisma/client")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const dotenv = require("dotenv")

// // get config vars
// dotenv.config()
// var secret = "secret" //process.env.JWT_SECRET

// const prisma = new PrismaClient()

// const postUser = async (newUser: any) => {
//     newUser.password = await bcrypt.hash(newUser.password, 10)
//     console.log(secret)
//     let userToken = jwt.sign(
//         {
//             id: newUser.id,
//         },
//         secret,
//         {
//             expiresIn: 86400,
//         },
//     )
//     console.log("usertoken", userToken)
//     await prisma.user
//         .create({
//             data: newUser,
//         })
//         .then((data: any) => {
//             console.log(data)
//         })
//         .catch((err: any) => {
//             console.log(err)
//         })
// }

// const getIdUser = async () => {
//     await prisma.user
//         .findUnique({
//             where: {
//                 id: 1,
//             },
//         })
//         .then((data: any) => {
//             console.log(data)
//         })
//         .catch((err: any) => {
//             console.log(err)
//         })
// }

// const getAllUser = async () => {
//     await prisma.user
//         .findMany()
//         .then((data: any) => {
//             console.log(data)
//         })
//         .catch((err: any) => {
//             console.log(err)
//         })
// }

// const register = async () => {}

// const newUser = {
//     email: "mellyyttt@yahoo.fr",
//     firstname: "melly",
//     lastname: "lucas",
//     password: "xxxx",
// }
// // postUser(newUser)
// getAllUser()

// //prisma generate
// //taper cette ligne de commande pour mettre prisma à jour
