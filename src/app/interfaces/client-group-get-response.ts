import { ClientGroup } from "./client-group"

export interface ClientGroupGetResponse {
    _embedded: {
        clientGroups: ClientGroup[]
    },
    _links: {
        self: {
            href: string
        }
    }
}