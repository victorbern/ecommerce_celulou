import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IFindProdutoRequestDTO, IFindProdutoResponseDTO } from "./FindProdutoDTO";

export class FindProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IFindProdutoRequestDTO): Promise<IFindProdutoResponseDTO> {
        const { codigoProduto } = data;

        const produto = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produto) {
            throw new AppError("Produto não encontrado!", 404);
        }

        let result: IFindProdutoResponseDTO = {
            codigoProduto: produto.codigoProduto,
            valor: produto.valor,
            nomeProduto: produto.nomeProduto,
            marca: produto.marca,
            descricaoProduto: produto.descricaoProduto,
            imagensFolder: produto.imagensFolder,
            nota: produto.nota,
            pesoGramas: produto.pesoGramas,
            alturaCM: produto.alturaCM,
            larguraCM: produto.larguraCM,
            comprimentoCM: produto.comprimentoCM,
            isDisponivelCompra: produto.isDisponivelCompra,
            isVisivel: produto.isVisivel
        }

        return result;
    }
}