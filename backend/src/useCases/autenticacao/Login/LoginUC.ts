import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { ILoginRequestDTO, ILoginResponseDTO } from "./LoginDTO";

export class LoginUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) {}

    async execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
        const { emailCliente } = data;

        const cliente = await this.clientesRepository.getByEmailCliente(emailCliente);

        if (!cliente) {
            throw new AppError("Cliente não encontrado", 404);
        }

        return cliente;
    }
}