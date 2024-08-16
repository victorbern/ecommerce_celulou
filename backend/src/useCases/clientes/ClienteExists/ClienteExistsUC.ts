import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { IClienteExistsRequestDTO } from "./ClienteExistsDTO";

export class ClienteExistsUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: IClienteExistsRequestDTO): Promise<Boolean> {
        const { codigoCliente } = data;

        if (!codigoCliente) {
            return false;
        }

        const clienteExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        if (!clienteExists) {
            return false;
        }

        return true;
    }
}