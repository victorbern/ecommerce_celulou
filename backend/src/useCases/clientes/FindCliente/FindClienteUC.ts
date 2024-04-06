import { ZodError } from "zod";
import { IFindClienteRequestDTO, IFindClienteResponseDTO } from "./FindClienteDTO";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { Cliente } from "../../../entities/Cliente";

export class FindClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) { }

    async execute(data: IFindClienteRequestDTO): Promise<IFindClienteResponseDTO> {
        try {
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
                    isAdmin: cliente.isAdmin
                };
            }

            return null;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError(error.errors[0].message, 400);
            }

            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}