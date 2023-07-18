import { Socket } from "socket.io"
import { ClientBag } from "../definitions/client"
import { PrismaClient } from "@prisma/client"
import { fetch } from "./prisma"

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

        fetch.chats.user(user, (chats) => socket.emit("chat:list", chats))
        fetch.crops.list((crops) => socket.emit("crops:list", crops))
        fetch.categories.list((categories) => socket.emit("categories:list", categories))
    } else {
        socket.emit("login:error")
    }
}
