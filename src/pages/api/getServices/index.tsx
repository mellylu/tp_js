import type { NextApiRequest, NextApiResponse } from "next";
import prisma, { someDatabaseOperation } from "../prismaClient";

export default async function GET_SERVICES(req: NextApiRequest, res: NextApiResponse) {
    try {
        const services = await someDatabaseOperation(() => prisma.services.findMany());
        res.status(200).send({
            data: services,
        });
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Some error occurred while fetching services.",
        });
    }
}
