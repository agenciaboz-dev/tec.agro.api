declare interface ChatBag {
    id: number
    message: string
    destination: User
}

declare interface NewChatBag {
    users: User[]
    channel: string
    message: string
}
