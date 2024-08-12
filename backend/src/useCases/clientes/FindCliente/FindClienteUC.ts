import { IFindClienteRequestDTO, IFindClienteResponseDTO } from "./FindClienteDTO";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) { }

    async execute(data: IFindClienteRequestDTO): Promise<IFindClienteResponseDTO> {
        const { codigoCliente } = data;

        if (!codigoCliente) {
            throw new AppError("Código inválido", HTTPStatusCode.BadRequest);
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