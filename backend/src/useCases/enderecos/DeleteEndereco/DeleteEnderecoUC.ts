import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { IDeleteEnderecoRequestDTO, IDeleteEnderecoResponseDTO } from "./DeleteEnderecoDTO";

export class DeleteEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
    ) {}

    async execute(data: IDeleteEnderecoRequestDTO): Promise<IDeleteEnderecoResponseDTO> {
        const { codigoEndereco } = data;

        const enderecoExists = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);

        if (!enderecoExists) {
            throw new AppError("Endereço não encontrado!", HTTPStatusCode.NotFound);
        }

        await this.enderecosRepository.delete(codigoEndereco);

        return { message: "Endereço deletado com sucesso!" }
    }
}