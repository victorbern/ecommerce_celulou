import { Endereco } from "../../../entities/Endereco";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { IUpdateEnderecoRequestDTO, IUpdateEnderecoResponseDTO } from "./UpdateEnderecoDTO";

export class UpdateEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
    ) {}

    async execute(data: IUpdateEnderecoRequestDTO): Promise<IUpdateEnderecoResponseDTO> {
        const { codigoEndereco, nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado } = data;

        const enderecoExists = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);

        if (!enderecoExists) {
            throw new AppError("Endereço não encontrado!", 404);
        }

        if (enderecoExists.nomeEndereco !== nomeEndereco) {
            const enderecosCliente = await this.enderecosRepository.getByCodigoCliente(enderecoExists.codigoCliente);
            for (let i in enderecosCliente) {
                if (enderecosCliente[i].nomeEndereco === nomeEndereco && enderecosCliente[i].codigoEndereco !== codigoEndereco) {
                    throw new AppError("Não é possível alterar o nome do endereço para um nome em uso por outro endereço", 400);
                }
            }
        }

        const endereco = new Endereco({codigoEndereco, nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente: enderecoExists.codigoCliente });

        await this.enderecosRepository.update(endereco);

        return { message: "Dados atualizados com sucesso!" }
    }
}