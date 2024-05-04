import { describe, expect, test } from "vitest";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { findProdutoUCTest } from ".";

describe("Testando a classe FindProdutoUC", () => {
    inMemoryProdutosRepository.items = [];

    inMemoryProdutosRepository.items = [
        {
            codigoProduto: "PAABBBCCCDDD",
            valor: 2222.22,
            nomeProduto: "Samsung Galaxy S23",
            marca: "Samsung",
            descricaoProduto: "Texto de Descrição",
            imagensFolder: "/produtos/PAABBBCCCDDD",
            nota: null,
            pesoGramas: 222.22,
            alturaCM: 22.22,
            larguraCM: 22.22,
            comprimentoCM: 22.22,
            isDisponivelCompra: false,
            isVisivel: false
        }
    ];

    test("Deve ser possível encontrar um produto", () => {
        expect(findProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        })).resolves.toStrictEqual({
            codigoProduto: "PAABBBCCCDDD",
            valor: 2222.22,
            nomeProduto: "Samsung Galaxy S23",
            marca: "Samsung",
            descricaoProduto: "Texto de Descrição",
            imagensFolder: "/produtos/PAABBBCCCDDD",
            nota: null,
            pesoGramas: 222.22,
            alturaCM: 22.22,
            larguraCM: 22.22,
            comprimentoCM: 22.22,
            isDisponivelCompra: false,
            isVisivel: false
        })
    })

    test("Não deve ser possível encontrar um produto porque o código não existe", () => {
        expect(findProdutoUCTest.execute({
            codigoProduto: "PBBCCCDDDEEE"
        })).rejects.toThrow("Produto não encontrado!")
    })

    test("Não deve ser possível encontrar um produto porque não há nenhum produto cadastrado", () => {
        // Limpando o base de produtos
        inMemoryProdutosRepository.items = [];
        expect(findProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        })).rejects.toThrow("Produto não encontrado!")
    })
})