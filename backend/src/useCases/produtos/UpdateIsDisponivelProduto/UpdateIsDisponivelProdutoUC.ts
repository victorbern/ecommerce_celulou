import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IUpdateIsDisponivelProdutoRequestDTO, IUpdateIsDisponivelProdutoResponseDTO } from "./UpdateIsDisponivelProdutoDTO";

export class UpdateIsDisponivelProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ){};

    async execute(data: IUpdateIsDisponivelProdutoRequestDTO): Promise<IUpdateIsDisponivelProdutoResponseDTO> {
        const { codigoProduto, isDisponivelCompra } = data;

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (isDisponivelCompra === null || isDisponivelCompra === undefined) {
            throw new AppError("Dados inválidos", 400);
        }

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        if (produtoExists.isDisponivelCompra === isDisponivelCompra) {
            return null;
        }

        await this.produtosRepository.updateIsDisponivelCompra(codigoProduto, isDisponivelCompra);

        return { message: "Visibilidade alterada com sucesso" }
    }
}