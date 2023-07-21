import { Server, Socket } from "socket.io"
import { Client, ClientBag } from "../../definitions/client"
import { User } from "@prisma/client"
import { handleLogin } from "./login"
import { handleLogout } from "./logout"
import { handleSignup } from "./signup"
import { newChat } from "./chat"
import { handleCrop } from "./crop"
import { handleBusiness } from "./business"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

export let clientList: Client[] = []

const userClient = (client: Client) => {
    const user: User = client.user
    return user
}

const clients: ClientBag = {
    get: (socket: Socket) => clientList.filter((client) => client.socket == socket)[0],
    find: (id: number) => clientList.filter((client) => client.user.id == id)[0],
    convert: (client: Client) => userClient(client),
    list: () => {
        return clientList.map((client) => client.user)
    },
    add: (client: Client) => clientList.push(client),
    remove: (client: Client) => {
        clientList = clientList.filter((item) => item.socket != client.socket)
    },
    update: (client: Client, user: User) => (clientList = [...clientList.filter((item) => item.socket != client.socket), { ...client, user }]),
}

export const handleSocket = (socket: Socket, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
        const client = clients.get(socket)
        if (client) clients.remove(client)
    })

    socket.on("user:login", (data) => {
        handleLogin(socket, clients, data)
    })

    socket.on("user:logout", () => {
        handleLogout(socket, clients)
    })

    socket.on("user:signup", (data: User) => {
        handleSignup(socket, data)
    })

    socket.on("chat:new", (data) => newChat(socket, clients, data))

    socket.on("crop:new", (data) => handleCrop(socket, data))

    socket.on("business:new", (data) => handleBusiness(socket, data, clients))
}
