import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { IDelClienteRequestDTO, IDelClienteResponseDTO } from "./DelClienteDTO";

export class DelClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) {}

    async execute(data: IDelClienteRequestDTO): Promise<IDelClienteResponseDTO> {
        const { codigoCliente } = data;

        const clienteExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", 404);
        }

        await this.clientesRepository.delete(codigoCliente);
        
        return { message: "Cliente deletado com sucesso!" }
    }
}