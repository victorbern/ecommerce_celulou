import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { Categoria } from "../../../entities/Categoria";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { IUpdateCategoriaRequestDTO, IUpdateCategoriaResponseDTO } from "./UpdateCategoriaDTO";

export class UpdateCategoriaUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: IUpdateCategoriaRequestDTO): Promise<IUpdateCategoriaResponseDTO> {
        const { codigoCategoria, nomeCategoria } = data;

        if (!codigoCategoria) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest);
        }

        const categoriaExists = await this.categoriasRepository.getByCodigo(codigoCategoria);

        if (!categoriaExists) {
            throw new AppError("Categoria não encontrada!", HTTPStatusCode.NotFound);
        }

        const categoria = new Categoria({codigoCategoria, nomeCategoria});

        await this.categoriasRepository.update(categoria);

        return { message: "Dados atualizados com sucesso!" }
    }
}