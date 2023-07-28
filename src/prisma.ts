import { Business, Category, Chat, Crop, PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export const include = {
    crops: { producer: true, mediated: { include: { agent: true } }, categories: true },
    chats: { messages: true, users: true },
    categories: {},

    user: {
        crops: { include: { mediated: true } },
        mediatedCrops: { include: { crop: { include: { producer: true } } } },
        chats: { include: { users: true, messages: { include: { user: true } } } },
        business: true,
    },

    business: { user: true },
}

export const fetch = {
    crops: {
        list: (callback: (crops: Crop[]) => void) => prisma.crop.findMany({ include: include.crops }).then((result) => callback(result)),
        id: (id: string | number, callback: (crops: Crop | null) => void) =>
            prisma.crop.findUnique({ where: { id: Number(id) }, include: include.crops }).then((result) => callback(result)),
        categories: {
            list: (callback: (categories: Category[]) => void) =>
                prisma.category.findMany({ include: include.categories }).then((result) => callback(result)),
        },
    },
    chats: {
        user: (user: User, callback: (crops: Chat[]) => void) =>
            prisma.chat.findMany({ where: { users: { some: { id: user.id } } }, include: include.chats }).then((result) => callback(result)),
    },

    user: {
        login: async (data: { login: string; password: string }) => {
            const user = await prisma.user.findFirst({
                where: {
                    OR: [{ document: data.login }, { email: data.login }, { username: data.login }],
                    AND: { password: data.password },
                },
                include: include.user,
            })

            return user
        },
        get: async (id: number) => await prisma.user.findUnique({ where: { id }, include: include.user }),
        update: async (data: User) =>
            await prisma.user.update({
                where: { id: data.id },
                data: {
                    address: data.address,
                    cep: data.cep,
                    city: data.city,
                    district: data.district,
                    document: data.document,
                    email: data.email,
                    name: data.name,
                    number: data.number,
                    phone: data.phone,
                    rg: data.rg,
                    image: `https://app.agenciaboz.com.br:4104/static/user/${data.id}/images/profile`,
                    //uf: data.uf,
                },
                include: include.user,
            }),
        list: (callback: (users: User[]) => void) => prisma.user.findMany({ include: include.user }).then((result) => callback(result)),
    },
    business: {
        list: (callback: (businesses: Business[]) => void) =>
            prisma.business.findMany({ include: include.business }).then((result) => callback(result)),
    },
}
