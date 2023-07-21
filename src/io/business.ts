import { Socket } from "socket.io"
import { Business, PrismaClient, User } from "@prisma/client"
import { fetch, include } from "../prisma"
import { ClientBag } from "../../definitions/client"
import { saveImage } from "../saveImage"

const prisma = new PrismaClient()

export const handleBusiness = async (socket: Socket, data: Business & { file: ArrayBuffer }, clients: ClientBag) => {
    const client = clients.get(socket)
    const path = `user/${client.user.id}/business/images`
    const filename = "profile"
    saveImage(path, data.file, filename)

    const business = await prisma.business.create({
        data: {
            document: data.document,
            email: data.email,
            name: data.name,
            phone: data.phone,
            service: data.service,
            store: data.store,
            userId: data.userId,
            image: `https://app.agenciaboz.com.br:4104/static/${path}/${filename}`,
        },
        include: include.business,
    })

    socket.broadcast.emit("business:new", business)
    socket.emit("business:new", business)

    // @ts-ignore
    const user = fetch.user.get(client.user.id) as User
    socket.emit("user:update", user)
    clients.update(client, user)
}
