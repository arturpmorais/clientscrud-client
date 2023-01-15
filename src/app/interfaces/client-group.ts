export interface ClientGroup {
    id: number,
    name: string,
    active: boolean,
    _links: {
        self: {
            href: string
        }
    }
}
