import { describe, expect, it } from "vitest";
import { Produto } from "../../../entities/Produto";
import { produtoFactoryTest } from "../../../factories/index.test";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.test";

const updateIsVisivelProdutoUCTest = produtoFactoryTest.useCases.updateIsVisivelProdutoUseCase();

const produtoDTO: Produto = {
    codigoProduto: "PAABBBCCCDDD",
    nomeProduto: "Samsung Galaxy S23",
    marca: "Samsung",
    descricaoProduto: "",
    pesoGramas: 200.0,
    alturaCM: 2,
    comprimentoCM: 20,
    larguraCM: 10,
    valor: 2000,
    imagensFolder: "PAABBBCCCDDD/",
    nota: 0,
    isDisponivelCompra: false,
    isVisivel: false
}

describe("Testando a classe UpdateIsVisivelProdutoUC", () => {
    it("Deve ser possível atualizar a visibilidade de um produto", async () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(produtoDTO);

        const response = await updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isVisivel: true
        });

        expect(response).toEqual({
            message: "Visibilidade alterada com sucesso!"
        });

        expect(produtosRepositoryMocked.updateIsVisivel).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível atualizar a vilibilidade de um produto caso o código enviado seja null, undefined ou vazio", () => {
        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: null,
            isVisivel: true
        })).rejects.toThrow("Código inválido!");

        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "",
            isVisivel: true
        })).rejects.toThrow("Código inválido!");

        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: undefined,
            isVisivel: true
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível atualizar a visibilidade de um produto caso o isVisivel seja inválido", () => {
        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isVisivel: null
        })).rejects.toThrow("Dados inválidos");

        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isVisivel: undefined
        })).rejects.toThrow("Dados inválidos");
    });

    it("Não deve ser possível atualizar a visibilidade de um produto caso o produto não exista", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(null);

        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isVisivel: true
        })).rejects.toThrow("Produto não encontrado");
    });

    it("Deve retornar null caso a visibilidade do produto salva seja a desejada", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue({
            ...produtoDTO,
            isVisivel: false
        });

        expect(updateIsVisivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isVisivel: false
        })).resolves.toBeNull();
    })
})