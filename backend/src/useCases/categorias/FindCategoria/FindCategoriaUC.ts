import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { IFindCategoriaRequestDTO, IFindCategoriaResponseDTO } from "./FindCategoriaDTO";

export class FindCategoriaUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: IFindCategoriaRequestDTO): Promise<IFindCategoriaResponseDTO> {
        const { codigoCategoria } = data;

        if (!codigoCategoria) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest)
        }

        let categoria: IFindCategoriaResponseDTO = await this.categoriasRepository.getByCodigo(codigoCategoria);

        if (categoria) {
            return {
                codigoCategoria: categoria.codigoCategoria,
                nomeCategoria: categoria.nomeCategoria
            }
        }

        return null;
    }
}