import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { CreateAlteracaoEstoqueUC } from "../../alteracao_estoque/CreateAlteracaoEstoque/CreateAlteracaoEstoqueUC";
import { ProdutoExistsUC } from "../../produtos/ProdutoExists/ProdutoExistsUC";
import { IAlterarEstoqueRequestDTO, IAlterarEstoqueResponseDTO } from "./AlterarEstoqueDTO";

export class AlterarEstoqueUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
        private createAlteracaoEstoqueUC: CreateAlteracaoEstoqueUC,
        private produtoExistsUC: ProdutoExistsUC,
    ) { }

    async execute(data: IAlterarEstoqueRequestDTO): Promise<IAlterarEstoqueResponseDTO> {
        const { codigoProduto, valorAlteracao } = data;

        if (!codigoProduto) {
            throw new AppError("Código do produto inválido!", HTTPStatusCode.BadRequest);
        }

        const produtoExists = await this.produtoExistsUC.execute({codigoProduto});

        if (!produtoExists) {
            throw new AppError("Produto não encontrado", HTTPStatusCode.NotFound);
        }

        const estoqueExists = await this.estoquesRepository.getByProduto(codigoProduto);

        if (!estoqueExists) {
            throw new AppError("Ocorreu um erro ao recuperar o estoque do produto. Por favor, crie um novo estoque para o produto.", HTTPStatusCode.NotFound);
        }

        if (estoqueExists.quantidade + valorAlteracao < 0) {
            throw new AppError("Estoque insuficiente!", HTTPStatusCode.BadRequest);
        }

        const quantidadeAtual = estoqueExists.quantidade;
        const codigoEstoque = estoqueExists.codigoEstoque;

        try {

            const quantidadeNova = quantidadeAtual + valorAlteracao;

            await this.estoquesRepository.alterarEstoque(codigoEstoque, quantidadeNova)
            

            await this.createAlteracaoEstoqueUC.execute({ valorAlteracao: valorAlteracao, codigoEstoque: codigoEstoque });

            return {
                message: "Estoque alterado com sucesso!",
                codigoEstoque: codigoEstoque,
                codigoProduto: estoqueExists.codigoProduto,
                quantidade: quantidadeNova,
            }

        } catch (error) {
            const estoque = await this.estoquesRepository.getByCodigo(codigoEstoque);

            if (estoque.quantidade !== quantidadeAtual) {
                await this.estoquesRepository.alterarEstoque(codigoEstoque, quantidadeAtual);
            }
            throw error;
        }

    }
}