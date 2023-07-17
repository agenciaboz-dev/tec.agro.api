import { Socket } from "socket.io"
import { Client, ClientBag } from "../../definitions/client"
import { User } from "@prisma/client"
import { handleLogin } from "../login"
import { handleLogout } from "../logout"

export let clientList: Client[] = []

const userClient = (client: Client) => {
    const user: User = client.user
    return user
}

const clients: ClientBag = {
    get: (socket: Socket) => clientList.filter((client) => client.socket == socket)[0],
    convert: (client: Client) => userClient(client),
    list: () => {
        return clientList.map((client) => client.user)
    },
    add: (client: Client) => clientList.push(client),
    remove: (client: Client) => {
        clientList = clientList.filter((item) => item.socket != client.socket)
    },
}

export const handleSocket = (socket: Socket) => {
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
}
