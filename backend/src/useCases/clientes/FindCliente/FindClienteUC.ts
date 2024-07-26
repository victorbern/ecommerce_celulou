import { IFindClienteRequestDTO, IFindClienteResponseDTO } from "./FindClienteDTO";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";

export class FindClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) { }

    async execute(data: IFindClienteRequestDTO): Promise<IFindClienteResponseDTO> {
        const { codigoCliente } = data;

        if (codigoCliente == null) {
            throw new AppError("Código inválido", 400);
        }

        let cliente: IFindClienteResponseDTO = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        if (cliente) {
            return {
                codigoCliente: cliente.codigoCliente,
                nomeCliente: cliente.nomeCliente,
                cpfCliente: cliente.cpfCliente,
                celularCliente: cliente.celularCliente,
                emailCliente: cliente.emailCliente,
                createdAt: cliente.createdAt,
            };
        }

        return null;
    }
}