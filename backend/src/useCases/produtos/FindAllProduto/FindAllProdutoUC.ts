import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindAllProdutoResponseDTO } from "./FindAllProdutoDTO";

export class FindAllProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(): Promise<IFindAllProdutoResponseDTO[]> {

    }
}