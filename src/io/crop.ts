import { Socket } from "socket.io"
import { ClientBag } from "../../definitions/client"
import { Crop, PrismaClient } from "@prisma/client"
import { fetch } from "../prisma"

const prisma = new PrismaClient()

export const handleCrop = async (socket: Socket, crop: Crop) => {
    socket.broadcast.emit("crop:new", crop)
}
