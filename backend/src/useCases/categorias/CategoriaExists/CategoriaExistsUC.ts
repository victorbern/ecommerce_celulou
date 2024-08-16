import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { ICategoriaExistsRequestDTO } from "./CategoriaExistsDTO";

export class CategoriaExistsUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: ICategoriaExistsRequestDTO): Promise<Boolean> {
        const { codigoCategoria } = data;

        if (!codigoCategoria) {
            return false;
        }

        const categoriaExists = await this.categoriasRepository.getByCodigo(codigoCategoria);
        
        if (!categoriaExists) {
            return false;
        }

        return true;
    }
}