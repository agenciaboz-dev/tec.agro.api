import { Server } from "socket.io"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

export let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined = undefined

export const setIo = (server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    io = server
}

export default io
