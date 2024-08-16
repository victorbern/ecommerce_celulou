import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IProdutoExistsRequestDTO } from "./ProdutoExistsDTO";

export class ProdutoExistsUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IProdutoExistsRequestDTO): Promise<Boolean> {
        const { codigoProduto } = data;

        if (!codigoProduto) {
            return false;
        }

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produtoExists) {
            return false;
        }

        return true;
    }
}