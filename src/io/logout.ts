import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const handleLogout = async (socket: Socket, clients: ClientBag) => {
    clients.remove(clients?.get(socket))
}
