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
        const { codigoProduto, valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM, categorias } = data;

        if (!codigoProduto) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest);
        }

        const produtoExists = await this.produtosRepository.getByCodigo(codigoProduto);

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", HTTPStatusCode.NotFound);
        }
        
        const produto = new Produto({codigoProduto, valor, nomeProduto, marca, descricaoProduto, imagensFolder: produtoExists.imagensFolder, nota: produtoExists.nota, pesoGramas, alturaCM, larguraCM, comprimentoCM });
        const produtoDTO = {
            ...produto,
            categorias: categorias
        }

        await this.produtosRepository.update(produtoDTO);

        return { message: "Dados atualizados com sucesso!" }
    }
}