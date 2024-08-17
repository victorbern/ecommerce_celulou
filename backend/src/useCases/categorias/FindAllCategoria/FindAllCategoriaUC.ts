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
        
        if (filtro) {
            categorias = await this.categoriasRepository.getAllWithFilter(filtro);
        } else {
            categorias = await this.categoriasRepository.getAll();
        }

        return categorias;
    }
}