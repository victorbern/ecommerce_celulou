import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindProdutoRequestDTO } from "./FindProdutoDTO";

export class FindProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IFindProdutoRequestDTO): Promise<Produto> {
        const { codigoProduto } = data;

        const produto = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produto) {
            throw new AppError("Produto não encontrado!", HTTPStatusCode.NotFound);
        }

        return produto;
    }
}