import { Produto } from "../../../entities/Produto";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";

export class FindAllProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(): Promise<Produto[]> {

        const produtos: Produto[] = await this.produtosRepository.getAll();

        return produtos;
    }
}