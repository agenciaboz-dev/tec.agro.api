import { Crop, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const crop = {
    new: (crop: Crop) => {
        prisma.crop.create({
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
        })
    },
}
