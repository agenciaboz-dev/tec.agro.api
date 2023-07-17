import { Socket } from "socket.io"

declare interface Client {
    socket: Socket
    user: User
}

declare interface ClientBag {
    get: (socket: Socket) => Client
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
    add: (client: Client) => number
    remove: (client: Client) => void
}
