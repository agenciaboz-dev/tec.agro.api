import { Business, PrismaClient } from "@prisma/client"
import { io as ioSocket } from "socket.io-client"
import { include } from "./prisma"

const prisma = new PrismaClient()
const io = ioSocket("wss://app.agenciaboz.com.br:4104")

export const business = {
    new: (business: Business, callback?: Function) => {
        prisma.business
            .create({
                data: {
                    document: business.document,
                    email: business.email,
                    name: business.name,
                    phone: business.phone,
                    service: business.service,
                    store: business.store,
                    userId: business.userId,
                    image: business.image,
                },
                include: include.business,
            })
            .then((result) => {
                if (result) {
                    io.emit("business:new", result)
                    if (callback) callback(result)
                }
            })
    },
}
