import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindProdutoRequestDTO } from "./FindProdutoDTO";

export class FindProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IFindProdutoRequestDTO): Promise<IProdutoDTO> {
        const { codigoProduto } = data;

        const produto: IProdutoDTO = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produto) {
            throw new AppError("Produto não encontrado!", HTTPStatusCode.NotFound);
        }

        return produto;
    }
}