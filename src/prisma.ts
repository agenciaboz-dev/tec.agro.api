import { Chat, Crop, PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

const include = {
    crops: { producer: true, mediated: { include: { agent: true } }, categories: true },
    chats: { messages: true, users: true },
}

export const fetch = {
    crops: {
        list: (callback: (crops: Crop[]) => void) => prisma.crop.findMany({ include: include.crops }).then((result) => callback(result)),
        id: (id: string | number, callback: (crops: Crop | null) => void) =>
            prisma.crop.findUnique({ where: { id: Number(id) }, include: include.crops }).then((result) => callback(result)),
    },
    chats: {
        user: (user: User, callback: (crops: Chat[]) => void) =>
            prisma.chat.findMany({ where: { users: { some: { id: user.id } } }, include: include.chats }).then((result) => callback(result)),
    },
}
