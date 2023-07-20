import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { PrismaClient } from "@prisma/client"
import { fetch } from "../prisma"

const prisma = new PrismaClient()

export const handleLogin = async (socket: Socket, clients: ClientBag, data: { login: string; password: string }) => {
    const user = await fetch.user.login(data)

    if (user) {
        clients.add({ socket, user })
        socket.emit("login:success", user)

        fetch.chats.user(user, (chats) => socket.emit("chat:list", chats))
        fetch.crops.list((crops) => socket.emit("crop:list", crops))
        fetch.categories.list((categories) => socket.emit("categories:list", categories))
    } else {
        socket.emit("login:error")
    }
}
