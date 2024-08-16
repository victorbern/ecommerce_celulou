import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { DeleteEnderecoUC } from "../../enderecos/DeleteEndereco/DeleteEnderecoUC";
import { FindEnderecoByClienteUC } from "../../enderecos/FindEnderecoByCliente/FindEnderecoByClienteUC";
import { IDelClienteRequestDTO, IDelClienteResponseDTO } from "./DelClienteDTO";

export class DelClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
        private findEnderecoByClienteUC: FindEnderecoByClienteUC,
        private deleteEnderecoUC: DeleteEnderecoUC,
    ) {}

    async execute(data: IDelClienteRequestDTO): Promise<IDelClienteResponseDTO> {
        const { codigoCliente } = data;

        if (!codigoCliente) {
            throw new AppError("Código inválido", HTTPStatusCode.BadRequest)
        }

        const clienteExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", HTTPStatusCode.NotFound);
        }

        // Deleta os endereços do cliente
        const enderecos = await this.findEnderecoByClienteUC.execute({codigoCliente: codigoCliente});

        for (let i in enderecos) {
            await this.deleteEnderecoUC.execute({codigoEndereco: enderecos[i].codigoEndereco})
        }

        await this.clientesRepository.delete(codigoCliente);
        
        return { message: "Cliente deletado com sucesso!" }
    }
}