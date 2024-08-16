import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { IFindEnderecoRequestDTO, IFindEnderecoResponseDTO } from "./FindEnderecoDTO";

export class FindEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
    ) {}

    async execute(data: IFindEnderecoRequestDTO): Promise<IFindEnderecoResponseDTO> {
        const { codigoEndereco } = data;

        if (!codigoEndereco) {
            throw new AppError("Código inválido", HTTPStatusCode.BadRequest);
        }

        let endereco = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);

        if (endereco) {
            return {
                codigoEndereco: endereco.codigoEndereco,
                nomeEndereco: endereco.nomeEndereco,
                cep: endereco.cep,
                nomeRua: endereco.nomeRua,
                numeroCasa: endereco.numeroCasa,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                codigoCliente: endereco.codigoCliente,
            }
        }

        return null;
    }
}