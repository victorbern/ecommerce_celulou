import { Produto } from "../../../entities/Produto";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindAllProdutoByCategoriasRequestDTO } from "./FindAllProdutoByCategoriasDTO";

export class FindAllProdutoByCategoriasUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IFindAllProdutoByCategoriasRequestDTO): Promise<Produto[]> {
        const { categorias } = data;

        const produtos: Produto[] = await this.produtosRepository.getByCategorias(categorias);

        return produtos;
    }
}