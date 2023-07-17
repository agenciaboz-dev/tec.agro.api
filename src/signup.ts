import { Socket } from "socket.io"
import { ClientBag } from "../definitions/client"
import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export const handleSignup = async (socket: Socket, data: User) => {
    const user = await prisma.user.create({data: {
        document: data.document,
        email: data.email,
        name: data.name,
        password: data.password,
    }})

    if(user){
        socket.emit("signup:success")
    }else{
        socket.emit("signup:error")
    }

}