import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { Produto } from "../../../entities/Produto";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";

export class FindAllProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(): Promise<IProdutoDTO[]> {

        const produtos: IProdutoDTO[] = await this.produtosRepository.getAll();

        return produtos;
    }
}