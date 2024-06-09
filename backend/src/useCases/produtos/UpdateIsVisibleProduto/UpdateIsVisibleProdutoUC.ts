import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IUpdateIsVisibleProdutoRequestDTO, IUpdateIsVisibleProdutoResponseDTO } from "./UpdateIsVisibleProdutoDTO";

export class UpdateIsVisibleProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IUpdateIsVisibleProdutoRequestDTO): Promise<IUpdateIsVisibleProdutoResponseDTO> {
        const { codigoProduto, isVisible } = data;

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (isVisible == null) {
            throw new AppError("Dados inválidos", 400)
        }

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        if (produtoExists.isVisivel === isVisible) {
            return null;
        }

        await this.produtosRepository.updateIsVisible(codigoProduto, isVisible);

        return { message: "Visibilidade alterada com sucesso!" }
    }
}