import { describe, expect, test } from "vitest";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { updateIsDisponivelProdutoUCTest } from ".";

describe("Testando a classe UpdateIsDisponivelProdutoUC", () => {
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
            isVisivel: false,
            isDisponivelCompra: true
        }
    ];

    test("Deve ser possível alterar a disponibilidade de compra de um produto", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PBBAAACCCDDD", isDisponivelCompra: true
        }).then((result) => {
            expect(inMemoryProdutosRepository.items[0].isDisponivelCompra === true);

            return result.message;
        })).resolves.toBe("Visibilidade alterada com sucesso");
    });

    test("Não deve ser possível alterar a disponibilidade de compra de um produto porque o produto já tem a disponibilidade desejada", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PCCAAABBBDDD", isDisponivelCompra: true
        })).resolves.toBeNull();
    })

    test("Não deve ser possísvel alterar a disponibilidade de compra de um produto porque o produto não existe", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PDDEEECCCBBB", isDisponivelCompra: true
        })).rejects.toThrow("Produto não encontrado");
    });

    test("Não deve ser possível alterar a disponibilidade de compra de um produto porque isDisponivelCompra é inválido", () => {
        expect(updateIsDisponivelProdutoUCTest.execute({
            codigoProduto: "PCCAAABBBDDD", isDisponivelCompra: null
        })).rejects.toThrow("Dados inválidos");
    })
})