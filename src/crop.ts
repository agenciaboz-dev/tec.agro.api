import { Crop, PrismaClient } from "@prisma/client"
import { io as ioSocket } from "socket.io-client"
import { include } from "./prisma"

const prisma = new PrismaClient()
const io = ioSocket("wss://app.agenciaboz.com.br:4104")

export const crop = {
    new: (crop: Crop, callback: Function) => {
        prisma.crop
            .create({
                data: {
                    name: crop.name,
                    description: crop.description,
                    price: crop.price,
                    weight: crop.weight,
                    date: crop.date,
                    image: crop.image,
                    gallery: crop.gallery,
                    producerId: crop.producerId,
                },
                include: include.crops,
            })
            .then((result) => {
                if (result) {
                    io.emit("crop:new", result)
                    callback(result)
                }
            })
    },
}
