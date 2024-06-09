import { describe, expect, test } from "vitest";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { updateIsVisibleProdutoUCTest } from ".";

describe("Testes para a classe UpdateIsVisbleProdutoUC", () => {
    inMemoryProdutosRepository.items = [];

    inMemoryProdutosRepository.items = [
        {
            codigoProduto: "PBBAAACCCDDD",
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
            codigoProduto: "PCCAAABBBDDD",
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
            isVisivel: true,
            isDisponivelCompra: false
        }
    ]


    test("Deve ser possível alterar a visibilidade de um produto", () => {
        expect(updateIsVisibleProdutoUCTest.execute({
            codigoProduto: "PBBAAACCCDDD", isVisible: true
        }).then((result) => {
            expect(inMemoryProdutosRepository.items[0].isVisivel === true);

            return result.message;
        })).resolves.toBe("Visibilidade alterada com sucesso!")
    });

    test("Não deve ser possível alterar a visibilidade de um produto porque o produto já tem a visibilidade desejada", () => {
        expect(updateIsVisibleProdutoUCTest.execute({
            codigoProduto: "PCCAAABBBDDD", isVisible: true
        })).resolves.toBeNull();
    });

    test("Não deve ser possível alterar a visibilidade de um produto porque o produto não existe", () => {
        expect(updateIsVisibleProdutoUCTest.execute({
            codigoProduto: "PDDEEECCCBBB", isVisible: false
        })).rejects.toThrow("Produto não encontrado");
    });

    test("Não deve ser possível alterar a visibilidade de um produto porque isVisible é inválido", () => {
        expect(updateIsVisibleProdutoUCTest.execute({
            codigoProduto: "PCCAAABBBDDD", isVisible: null
        })).rejects.toThrow("Dados inválidos")
    })
});