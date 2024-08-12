import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { IFindEnderecoByClienteRequestDTO, IFindEnderecoByClienteResponseDTO } from "./FindEnderecoByClienteDTO";

export class FindEnderecoByClienteUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
        private findClienteUC: FindClienteUC,
    ) {}

    async execute(data: IFindEnderecoByClienteRequestDTO): Promise<IFindEnderecoByClienteResponseDTO[]> {
        const { codigoCliente } = data;

        if (!codigoCliente) {
            throw new AppError("Código inválido", HTTPStatusCode.BadRequest);
        }

        const clienteExists = await this.findClienteUC.execute({ codigoCliente });

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", HTTPStatusCode.NotFound);
        }

        let enderecos = await this.enderecosRepository.getByCodigoCliente(codigoCliente);
        
        return enderecos;
    }
}