import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindAllProdutoByCategoriasRequestDTO } from "./FindAllProdutoByCategoriasDTO";

export class FindAllProdutoByCategoriasUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IFindAllProdutoByCategoriasRequestDTO): Promise<IProdutoDTO[]> {
        const { categorias } = data;

        const produtos: IProdutoDTO[] = await this.produtosRepository.getByCategorias(categorias);

        return produtos;
    }
}