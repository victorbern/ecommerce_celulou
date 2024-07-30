import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IUpdateProdutoRequestDTO, IUpdateProdutoResponseDTO } from "./UpdateProdutoDTO";

export class UpdateProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IUpdateProdutoRequestDTO): Promise<IUpdateProdutoResponseDTO> {
        const { codigoProduto, valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM } = data;

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", HTTPStatusCode.NotFound);
        }
        
        const produto = new Produto({codigoProduto, valor, nomeProduto, marca, descricaoProduto, imagensFolder: produtoExists.imagensFolder, nota: produtoExists.nota, pesoGramas, alturaCM, larguraCM, comprimentoCM });

        await this.produtosRepository.update(produto);

        return { message: "Dados atualizados com sucesso!" }
    }
}