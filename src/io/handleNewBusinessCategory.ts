import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { PrismaClient } from "@prisma/client"
import { fetch } from "../prisma"

const prisma = new PrismaClient()

export const handleNewBusinessCategory = async (socket: Socket, data: { name: string }) => {
    const category = await fetch.business.categories.add(data)

    socket.broadcast.emit("business:category:new", category)
    socket.emit("business:category:new", category)
}
