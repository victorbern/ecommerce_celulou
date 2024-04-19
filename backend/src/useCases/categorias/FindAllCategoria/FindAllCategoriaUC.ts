import { Categoria } from "@prisma/client";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { IFindAllCategoriaRequestDTO, IFindAllCategoriaResponseDTO } from "./FindAllCategoriaDTO";

export class FindAllCategoriaUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: IFindAllCategoriaRequestDTO): Promise<IFindAllCategoriaResponseDTO[]> {
        const { filtro } = data;

        let categorias: Categoria[] = [];
        let result: IFindAllCategoriaResponseDTO[] = [];
        if (filtro) {
            categorias = await this.categoriasRepository.getAllWithFilter(filtro);
        } else {
            categorias = await this.categoriasRepository.getAll();
        }

        for (let i in categorias) {
            result.push({
                codigoCategoria: categorias[i].codigoCategoria,
                nomeCategoria: categorias[i].nomeCategoria,
            });
        }

        return result;
    }
}