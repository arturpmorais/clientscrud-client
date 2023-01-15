import { Client } from "./client"

export interface ClientGetResponse {
    _embedded: {
        clients: Client[]
    },
    _links: {
        self: {
            href: string
        }
    }
}