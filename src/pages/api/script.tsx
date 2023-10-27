// exécution des requêtes avec prisma
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const postUser = async () => {
    await prisma.user
        .create({
            data: {
                token: "1d5g2fg21f",
                email: "mel@yahoo.fr",
                firstname: "melly",
                lastname: "lucas",
                password: "xxxxx",
            },
        })
        .then((data: any) => {
            console.log(data)
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const getIdUser = async () => {
    await prisma.user
        .findUnique({
            where: {
                id: 1,
            },
        })
        .then((data: any) => {
            console.log(data)
        })
        .catch((err: any) => {
            console.log(err)
        })
}

const getAllUser = async () => {
    await prisma.user
        .findMany()
        .then((data: any) => {
            console.log(data)
        })
        .catch((err: any) => {
            console.log(err)
        })
}

//prisma generate
//taper cette ligne de commande pour mettre prisma à jour
