import { IProdutoHasCategoriaRepository } from "../../../repositories/IProdutoHasCategoriaRepository";
import { IFindAllProdutoByCategoriaRequestDTO, IFindAllProdutoByCategoriaResponseDTO } from "./FindAllProdutoByCategoriaDTO";

export class FindAllProdutoByCategoriaUC {
    constructor(
        private produtoHasCategoriaRepository: IProdutoHasCategoriaRepository
    ) {}

    async execute(data: IFindAllProdutoByCategoriaRequestDTO): Promise<IFindAllProdutoByCategoriaResponseDTO> {
        const { codigoCategoria } = data;

        const 
    }
}