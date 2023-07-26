import { User } from "@prisma/client"
import { Socket } from "socket.io"

declare interface Client {
    socket: Socket
    user: User
}

declare interface ClientBag {
    get: (socket: Socket) => Client | undefined
    find: (id: number) => Client | undefined
    convert: (client: Client) => GetResult<
        {
            id: number
            email: string
            document: string
            password: string
            name: string
        },
        unknown
    > & {}
    list: () => User[]
    add: (client: Client) => void
    remove: (client: Client | undefined) => void
    update: (client: Client, user: User) => Client[]
}
