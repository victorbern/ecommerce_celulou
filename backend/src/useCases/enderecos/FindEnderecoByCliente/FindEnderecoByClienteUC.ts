import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { IFindEnderecoByClienteRequestDTO, IFindEnderecoByClienteResponseDTO } from "./FindEnderecoByClienteDTO";

export class FindEnderecoByClienteUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
    ) {}

    async execute(data: IFindEnderecoByClienteRequestDTO): Promise<IFindEnderecoByClienteResponseDTO[]> {
        const { codigoCliente } = data;

        if (!codigoCliente) {
            throw new AppError("Código do cliente inválido", HTTPStatusCode.BadRequest)
        }

        let enderecos = await this.enderecosRepository.getByCodigoCliente(codigoCliente);

        return enderecos;
    }
}