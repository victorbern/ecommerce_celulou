import { IClientesRepository } from "../../repositories/IClientesRepository";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: IClientesRepository)
}