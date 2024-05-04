import { describe, expect, test } from "vitest";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { createProdutoUCTest } from ".";

describe("Testando a classe CreateProdutoUC", () => {
    inMemoryProdutosRepository.items = [];

    test("Deve ser possivel criar um produto", () => {
        // Testando com valores normais
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9
        }).then((result) => {
            expect(result.codigoProduto).toBe(inMemoryProdutosRepository.items[0].codigoProduto);
            expect(result.message).toBe("Produto cadastrado com sucesso")

            expect(inMemoryProdutosRepository.items[0].valor).toBe(2080.99);
            expect(inMemoryProdutosRepository.items[0].nomeProduto).toBe("Xiaomi Redmi Note 10 Pro");
            expect(inMemoryProdutosRepository.items[0].marca).toBe("Xiaomi");
            expect(inMemoryProdutosRepository.items[0].descricaoProduto).toBe("Smartphone com X memória Y câmera");
            expect(inMemoryProdutosRepository.items[0].nota).toBeNull();
            expect(inMemoryProdutosRepository.items[0].pesoGramas).toBe(230.00);
            expect(inMemoryProdutosRepository.items[0].alturaCM).toBe(2.8);
            expect(inMemoryProdutosRepository.items[0].larguraCM).toBe(15.00);
            expect(inMemoryProdutosRepository.items[0].comprimentoCM).toBe(6.9);
            expect(inMemoryProdutosRepository.items[0].isDisponivelCompra).toBeFalsy();
            expect(inMemoryProdutosRepository.items[0].isVisivel).toBeFalsy();

            // Testando a pasta imagensFolder
            expect(inMemoryProdutosRepository.items[0].imagensFolder).toBe("/produtos/" + inMemoryProdutosRepository.items[0].codigoProduto + "/")
        })).resolves;

        // Testando com valores iguais a zero
        expect(createProdutoUCTest.execute({
            valor: 0,
            nomeProduto: "Xiaomi Redmi Note 12 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 0,
            alturaCM: 0,
            larguraCM: 0, 
            comprimentoCM: 0
        }).then((result) => {
            expect(result.codigoProduto).toBe(inMemoryProdutosRepository.items[1].codigoProduto);
            expect(result.message).toBe("Produto cadastrado com sucesso")

            expect(inMemoryProdutosRepository.items[1].valor).toBe(0);
            expect(inMemoryProdutosRepository.items[1].nomeProduto).toBe("Xiaomi Redmi Note 12 Pro");
            expect(inMemoryProdutosRepository.items[1].marca).toBe("Xiaomi");
            expect(inMemoryProdutosRepository.items[1].descricaoProduto).toBe("Smartphone com X memória Y câmera");
            expect(inMemoryProdutosRepository.items[1].nota).toBeNull();
            expect(inMemoryProdutosRepository.items[1].pesoGramas).toBe(0);
            expect(inMemoryProdutosRepository.items[1].alturaCM).toBe(0);
            expect(inMemoryProdutosRepository.items[1].larguraCM).toBe(0);
            expect(inMemoryProdutosRepository.items[1].comprimentoCM).toBe(0);
            expect(inMemoryProdutosRepository.items[1].isDisponivelCompra).toBeFalsy();
            expect(inMemoryProdutosRepository.items[1].isVisivel).toBeFalsy();

            // Testando a pasta imagensFolder
            expect(inMemoryProdutosRepository.items[1].imagensFolder).toBe("/produtos/" + inMemoryProdutosRepository.items[1].codigoProduto + "/")
        })).resolves
    });

    test("Não deve ser possível criar um produto com um nome que já exista", () => {
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9
        })).rejects.toThrow("Este produto já existe")
    });

    test("Não deve ser possível criar um produto com algum dos dados inválidos (testando se o zod está validando os dados)", () => {
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9
        })).rejects.toThrow("É necessário inserir um nome para o produto")
    })
})