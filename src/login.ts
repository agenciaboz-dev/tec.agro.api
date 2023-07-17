import { Socket } from "socket.io"
import { ClientBag } from "../definitions/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const handleLogin = async (socket: Socket, clients: ClientBag, data: { login: string; password: string }) => {
    const user = await prisma.user.findFirst({
        where: { OR: [{ document: data.login }, { email: data.login }], AND: { password: data.password } },
        include: {
            crops: { include: { mediated: true } },
            mediatedCrops: { include: { crop: { include: { producer: true } } } },
            chats: { include: { users: true, messages: { include: { user: true } } } },
        },
    })

    if (user) {
        clients.add({ socket, user })
        socket.emit("login:success", user)

        const chats = await prisma.chat.findMany({ where: { users: { some: { id: user.id } } }, include: { messages: true, users: true } })
        socket.emit("chats:list", chats)

        const crops = await prisma.crop.findMany({ include: { producer: true, mediated: { include: { agent: true } } } })
        socket.emit("crops:list", crops)
    } else {
        socket.emit("login:error")
    }
}
