import { User } from "@prisma/client"
import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { fetch } from "../prisma"
import { saveImage } from "../saveImage"

export const handleUserUpdate = async (socket: Socket, data: User & { file?: ArrayBuffer }, clients: ClientBag) => {
    if (data.file) {
        const path = `user/${data.id}/images`
        const filename = "profile"
        saveImage(path, data.file, filename)
    }

    const user = await fetch.user.update(data)
    console.log(user)
    socket.broadcast.emit("user:update", user)
    socket.emit("user:update", user)
}
