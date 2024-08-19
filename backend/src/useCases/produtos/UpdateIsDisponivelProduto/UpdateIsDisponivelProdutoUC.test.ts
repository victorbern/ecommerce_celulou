import { describe, expect, it } from "vitest";
import { Produto } from "../../../entities/Produto";
import { produtoFactoryTest } from "../../../factories/index.test";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.test";

const updateIsDisponivelProdutoUCTest = produtoFactoryTest.useCases.updateIsDisponivelProdutoUseCase();

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

describe("Testando a classe UpdateIsDisponivelProdutoUC", () => {
    it("Deve ser possível alterar a disponibilidade de compra de um produto", async () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(produtoDTO);

        const response = await updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isDisponivelCompra: true
        })

        expect(response).toEqual({
            message: "Disponibilidade de compra alterada com sucesso!"
        });

        expect(produtosRepositoryMocked.updateIsDisponivelCompra).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível alterar a disponibilidade de compra de um produto caso o código do produto seja null ou undefined", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: null,
            isDisponivelCompra: true
        })).rejects.toThrow("Código inválido");

        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: undefined,
            isDisponivelCompra: true
        })).rejects.toThrow("Código inválido");
    });

    it("Não deve ser possível alterar a disponibilidade de compra de um produto caso a variável isDisponivelCompra seja null ou undefined", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isDisponivelCompra: null,
        })).rejects.toThrow("Dados inválidos");

        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isDisponivelCompra: undefined,
        })).rejects.toThrow("Dados inválidos");
    });

    it("Não deve ser possível alterar a disponibilidade de compra de um produto caso o produto não exista", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(null);

        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isDisponivelCompra: true
        })).rejects.toThrow("Produto não encontrado")
    });

    it("Deve retornar null caso a disponibilidade de compra salva seja a desejada", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue({
            ...produtoDTO,
            isDisponivelCompra: false,
        });

        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            isDisponivelCompra: false
        })).resolves.toBeNull()
    })
});