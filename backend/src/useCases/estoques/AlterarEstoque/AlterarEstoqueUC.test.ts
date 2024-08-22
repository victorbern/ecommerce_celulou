import { beforeAll, describe, expect, it, vi } from "vitest";
import { alteracaoEstoqueFactoryTest, estoqueFactoryTest, produtoFactoryTest } from "../../../factories/index.test";
import { AlterarEstoqueUC } from "./AlterarEstoqueUC";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/index.test";
import { Estoque } from "../../../entities/Estoque";

const createAlteracaoEstoqueUCTest = alteracaoEstoqueFactoryTest.useCases.createAlteracaoEstoqueUseCase(estoqueFactoryTest);
const produtoExistsUCTest = produtoFactoryTest.useCases.produtoExistsUseCase();
const alterarEstoqueUCTest = new AlterarEstoqueUC(estoquesRepositoryMocked, createAlteracaoEstoqueUCTest, produtoExistsUCTest);

const estoqueDTO: Estoque = {
    codigoEstoque: "EAABBBCCCDDD",
    quantidade: 10,
    codigoProduto: "PAABBBCCCDDD"
}

describe("Testando a classe AlteracaoEstoqueUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível alterar o estoque", async () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue(estoqueDTO);
        vi.spyOn(createAlteracaoEstoqueUCTest, 'execute').mockResolvedValue({
            message: "Alteração do estoque salva com sucesso!",
            codigoAlteracaoEstoque: "GAABBBCCCDDD"
        });

        const response = await alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -4
        });

        expect(response).toEqual({
            message: "Estoque alterado com sucesso!",
            codigoEstoque: estoqueDTO.codigoEstoque,
            codigoProduto: estoqueDTO.codigoProduto,
            quantidade: estoqueDTO.quantidade - 4,
        })
    });

    it("Não deve ser possível alterar a quantidade de estoque de um produto caso o código do produto seja inválido", () => {
        // Testando com código do produto nulo
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: null,
            valorAlteracao: 2
        })).rejects.toThrow("Código do produto inválido!");

        // Testando com código do produto undefined
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: undefined,
            valorAlteracao: 2
        })).rejects.toThrow("Código do produto inválido!");

        // Testando com código do produto vazio
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "",
            valorAlteracao: 2
        })).rejects.toThrow("Código do produto inválido!");
    });

    it("Não deve ser possível alterar a quantidade de estoque de um produto caso o produto não exista", () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(null);

        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -2
        })).rejects.toThrow("Produto não encontrado")
    });

    it("Não deve ser possível alterar o estoque de um produto caso o estoque não exista", () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue(null);

        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: 2
        })).rejects.toThrow("Ocorreu um erro ao recuperar o estoque do produto. Por favor, crie um novo estoque para o produto.")
    });

    it("Não deve ser possível alterar o estoque caso a quantidade a ser removida seja maior do que a quantidade do estoque", () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue({
            ...estoqueDTO,
            quantidade: 10
        });

        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -20
        })).rejects.toThrow("Estoque insuficiente!");
    });

    it("Deve desfazer tudo o que foi feito caso ocorra um erro ao alterar o estoque", async () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue(estoqueDTO);
        vi.spyOn(createAlteracaoEstoqueUCTest, 'execute').mockRejectedValue("Erro");

        estoquesRepositoryMocked.getByCodigo.mockClear();
        estoquesRepositoryMocked.alterarEstoque.mockClear();

        const response = await alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -5
        }).catch(erro => erro);

        expect(estoquesRepositoryMocked.getByCodigo).toHaveBeenCalledOnce();
        expect(estoquesRepositoryMocked.alterarEstoque).toHaveBeenCalledOnce();
    })
})