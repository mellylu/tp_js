// // exécution des requêtes avec prisma
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// interface user {
//     id: number
//     token: string
//     createdAt: Date
//     email: string
//     firstname: string | null
//     lastname: string | null
//     password: string
// }

// const Xxx: React.FC<user> = async ({ token, email, firstname, lastname, password }) => {
//     const newUser = await prisma.user.create({
//         data: {
//             token: "1d5g2fg21f",
//             email: "mel@yahoo.fr",
//             firstname: "melly",
//             lastname: "lucas",
//             password: "xxxxx",
//         },
//     })
//     newUser
//         .then((data: any) => {
//             console.log(data)
//         })
//         .catch((err: any) => {
//             console.log(err)
//         })
// }

// const getIdUser = async () => {
//     const user = await prisma.user.findUnique({
//         where: {
//             id: 1,
//         },
//     })
//     user.then((data: any) => {
//         console.log(data)
//     }).catch((err: any) => {
//         console.log(err)
//     })
// }

// const getAllUser = async () => {
//     const users = await prisma.user.findMany()
//     users
//         .then((data: any) => {
//             console.log(data)
//         })
//         .catch((err: any) => {
//             console.log(err)
//         })
// }

// //prisma generate
// //taper cette ligne de commande pour mettre prisma à jour
