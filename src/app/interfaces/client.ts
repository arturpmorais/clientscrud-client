export interface Client {
    id: number,
    name: string,
    documentType: string,
    document: string,
    rg: string,
    registrationDate: Date,
    clientGroup: string,
    active: boolean
}
