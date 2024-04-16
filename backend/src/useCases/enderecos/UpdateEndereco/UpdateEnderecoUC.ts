import { Endereco } from "../../../entities/Endereco";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { IUpdateEnderecoRequestDTO, IUpdateEnderecoResponseDTO } from "./UpdateEnderecoDTO";

export class UpdateEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
    ) {}

    async execute(data: IUpdateEnderecoRequestDTO): Promise<IUpdateEnderecoResponseDTO> {
        const { codigoEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado } = data;

        const enderecoExists = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);

        if (!enderecoExists) {
            throw new AppError("Endereço não encontrado!", 404);
        }

        const endereco = new Endereco({codigoEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente: enderecoExists.codigoCliente });

        await this.enderecosRepository.update(endereco);

        return { message: "Dados atualizados com sucesso!" }
    }
}