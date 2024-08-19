import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IUpdateIsVisivelProdutoRequestDTO, IUpdateIsVisivelProdutoResponseDTO } from "./UpdateIsVisivelProdutoDTO";

export class UpdateIsVisivelProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IUpdateIsVisivelProdutoRequestDTO): Promise<IUpdateIsVisivelProdutoResponseDTO> {
        const { codigoProduto, isVisivel } = data;

        if (!codigoProduto) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest);
        }
        
        if (isVisivel == null || isVisivel == undefined) {
            throw new AppError("Dados inválidos", HTTPStatusCode.BadRequest)
        }

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", HTTPStatusCode.NotFound);
        }

        if (produtoExists.isVisivel === isVisivel) {
            return null;
        }

        await this.produtosRepository.updateIsVisivel(codigoProduto, isVisivel);

        return { message: "Visibilidade alterada com sucesso!" }
    }
}