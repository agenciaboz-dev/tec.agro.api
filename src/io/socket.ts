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
import { handleUserUpdate } from "./userUpdate"

export let clientList: Client[] = []

const userClient = (client: Client) => {
    const user: User = client.user
    return user
}

const clients: ClientBag = {
    get: (socket: Socket) => clientList.find((client) => client.socket == socket),
    find: (id: number) => clientList.find((client) => client.user.id == id),
    convert: (client: Client) => userClient(client),
    list: () => {
        return clientList.map((client) => client.user)
    },
    add: (client: Client) => {
        const exists = clientList.find((item) => item.user?.id == client.user.id)
        if (exists) clientList.filter((item) => item.socket != client.socket)

        clientList.push(client)
    },
    remove: (client: Client | undefined) => {
        if (!client) return
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

    socket.on("client:sync", (user: User) => {
        clients.add({ socket, user })
        console.log(`reconnection: ${clients.get(socket)?.user.name}`)
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
    socket.on("user:update", (data) => handleUserUpdate(socket, data, clients))
}
