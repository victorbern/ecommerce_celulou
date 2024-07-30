import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { IDeleteCategoriaRequestDTO, IDeleteCategoriaResponseDTO } from "./DeleteCategoriaDTO";

export class DeleteCategoriaUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: IDeleteCategoriaRequestDTO): Promise<IDeleteCategoriaResponseDTO> {
        const { codigoCategoria } = data;

        const categoriaExists = await this.categoriasRepository.getByCodigo(codigoCategoria);

        if(!categoriaExists) {
            throw new AppError("Categoria não encontrada!", HTTPStatusCode.NotFound);
        }

        await this.categoriasRepository.delete(codigoCategoria);

        return { message: "Categoria deletada com sucesso!" }
    }
}