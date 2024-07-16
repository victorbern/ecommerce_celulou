import { describe, expect, test } from "vitest";
import { inMemoryEstoquesRepository, inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { createEstoqueUCTest } from ".";

describe("Testando a classe CreateEstoqueUC", () => {
    inMemoryEstoquesRepository.items = [];

    inMemoryProdutosRepository.items = [
        {
            codigoProduto: "PAABBBCCCDDD",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xioami",
            descricaoProduto: "Smartphone com X memória Y câmera",
            imagensFolder: "/produtos/PAABBBCCCDDD/",
            nota: 4.8,
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00,
            comprimentoCM: 6.9,
            isVisivel: false,
            isDisponivelCompra: false
        },
        {
            codigoProduto: "PBBCCCDDDEEE",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xioami",
            descricaoProduto: "Smartphone com X memória Y câmera",
            imagensFolder: "/produtos/PAABBBCCCDDD/",
            nota: 4.8,
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00,
            comprimentoCM: 6.9,
            isVisivel: false,
            isDisponivelCompra: false
        }
    ]

    test("Deve ser possível criar um estoque", () => {
        expect(createEstoqueUCTest.execute({
            quantidade: 2, codigoProduto: "PAABBBCCCDDD"
        }).then((result) => {
            expect(inMemoryEstoquesRepository.items[0].codigoEstoque).toBe(result.codigoEstoque);
            expect(inMemoryEstoquesRepository.items[0].quantidade).toBe(2);
            expect(inMemoryEstoquesRepository.items[0].codigoProduto).toBe("PAABBBCCCDDD");
        }));
    })

    test("Caso o produto já tenha estoque o sistema deve devolver o codigo do estoque", () => {
        // Altera o banco de estoques para testes
        inMemoryEstoquesRepository.items = [{ codigoEstoque: "FAABBBCCCDDD", quantidade: 0, codigoProduto: "PAABBBCCCDDD" }]
        expect(createEstoqueUCTest.execute({
            quantidade: 2, codigoProduto: "PAABBBCCCDDD"
        }).then((result) => {
            expect(result.message).toBe("Este produto já possui estoque");
            expect(result.codigoEstoque).toBe(inMemoryEstoquesRepository.items[0].codigoEstoque)
        }))
    });

    test("Deve ser possível criar um estoque com quantidade igual a zero", () => {
        // Zera os estoques para testes
        inMemoryEstoquesRepository.items = []
        expect(createEstoqueUCTest.execute({
            quantidade: 0, codigoProduto: "PAABBBCCCDDD"
        }).then((result) => {
            expect(inMemoryEstoquesRepository.items[0].codigoEstoque).toBe(result.codigoEstoque);
            expect(inMemoryEstoquesRepository.items[0].quantidade).toBe(0);
            expect(inMemoryEstoquesRepository.items[0].codigoProduto).toBe("PAABBBCCCDDD");
        }))
    })


    test("Deve ser possível criar o estoque caso não envie uma quantidade inicial", () => {
        // Zera os estoques para testes
        inMemoryEstoquesRepository.items = []
        expect(createEstoqueUCTest.execute({
            quantidade: null, codigoProduto: "PAABBBCCCDDD"
        }).then(() => {
            expect(inMemoryEstoquesRepository.items[0].quantidade).toBe(0);
        }));

        expect(createEstoqueUCTest.execute({
            quantidade: undefined, codigoProduto: "PBBCCCDDDEEE"
        }).then(() => {
            expect(inMemoryEstoquesRepository.items[1].quantidade).toBe(0);
        }))
    });

    test("Não deve ser possível criar um estoque com quantidade negativa", () => {
        // Zera os estoques para testes
        inMemoryEstoquesRepository.items = [];
        expect(createEstoqueUCTest.execute({
            quantidade: -2, codigoProduto: "PAABBBCCCDDD"
        })).rejects.toThrow("Quantidade inválida!")
    });

    test("Não deve ser possível criar um estoque com código do produto inválido", () => {
        expect(createEstoqueUCTest.execute({
            quantidade: 0, codigoProduto: null
        })).rejects.toThrow("Código de produto inválido");
    });

    test("Não deve ser possível criar um estoque para um produto que não existe", () => {
        expect(createEstoqueUCTest.execute({
            quantidade: 2, codigoProduto: "PAAXXXAAAXXX"
        })).rejects.toThrow("Produto não encontrado!")
    })
})