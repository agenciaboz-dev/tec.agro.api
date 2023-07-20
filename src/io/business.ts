import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { Business, PrismaClient } from "@prisma/client"
import { fetch } from "../prisma"

const prisma = new PrismaClient()

export const handleBusiness = async (socket: Socket, data: Business & { file: File }) => {
    console.log(data)
    // const business = await prisma.business.create({
    //     data: {
    //         document: data.document,
    //         email: data.email,
    //         name: data.name,
    //         phone: data.phone,
    //         service: data.service,
    //         store: data.store,
    //         userId: data.userId,
    //         image:
    //     },
    // })
    socket.broadcast.emit("business:new", data)
}
