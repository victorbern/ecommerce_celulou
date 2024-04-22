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

        const categoriaExists = await this.categoriasRepository.getByCodigo(codigoCategoria);

        if (!categoriaExists) {
            throw new AppError("Categoria não encontrada!", 404);
        }

        const categoria = new Categoria({codigoCategoria, nomeCategoria});

        await this.categoriasRepository.update(categoria);

        return { message: "Dados atualizados com sucesso!" }
    }
}