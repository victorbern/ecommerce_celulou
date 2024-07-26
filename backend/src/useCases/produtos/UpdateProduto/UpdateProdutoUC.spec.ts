import { describe, expect, test } from "vitest";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { updateProdutoUCTest } from ".";

describe("Testando a classe UpdateProdutoUC", () => {
    inMemoryProdutosRepository.items = [];

    inMemoryProdutosRepository.items = [{
        codigoProduto: "PAABBBBBBCCC",
        valor: 2000,
        nomeProduto: "Samsung Galaxy A54",
        marca: "Samsung",
        descricaoProduto: "Smartphone com X memória Y câmera",
        imagensFolder: "/produtos/PAABBBBBBCCC/",
        nota: 5.0,
        pesoGramas: 231.00,
        alturaCM: 2.3,
        larguraCM: 15.20, 
        comprimentoCM: 6.91,
        isVisivel: false,
        isDisponivelCompra: false
    }]

    test("Deve ser possível atualizar os dados do produto", () => {
        expect(updateProdutoUCTest.execute({
            codigoProduto: "PAABBBBBBCCC",
            valor: 2100,
            nomeProduto: "Xiaomi Redmi Note 11",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com Y memória X câmera",
            pesoGramas: 310.00,
            alturaCM: 3.0,
            larguraCM: 16.20, 
            comprimentoCM: 7.2,
        }).then(() => {
            expect(inMemoryProdutosRepository.items[0].valor).toBe(2100);
            expect(inMemoryProdutosRepository.items[0].nomeProduto).toBe("Xiaomi Redmi Note 11");
            expect(inMemoryProdutosRepository.items[0].marca).toBe("Xiaomi");
            expect(inMemoryProdutosRepository.items[0].descricaoProduto).toBe("Smartphone com Y memória X câmera");
            expect(inMemoryProdutosRepository.items[0].pesoGramas).toBe(310);
            expect(inMemoryProdutosRepository.items[0].alturaCM).toBe(3);
            expect(inMemoryProdutosRepository.items[0].larguraCM).toBe(16.2);
            expect(inMemoryProdutosRepository.items[0].comprimentoCM).toBe(7.2)
        }));
    });

    test("Não deve ser possível alterar os dados de produto porque o produto não existe", () => {
        expect(updateProdutoUCTest.execute({
            codigoProduto: "PAAAAAAAAAAA",
            valor: 2100,
            nomeProduto: "Xiaomi Redmi Note 11",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com Y memória X câmera",
            pesoGramas: 310.00,
            alturaCM: 3.0,
            larguraCM: 16.20, 
            comprimentoCM: 7.2,
        })).rejects.toThrow("Produto não encontrado")
    })

    test("Não é possível alterar os dados de produto porque um dos dados é inválido (testando se o zod está funcionando)", () => {
        expect(updateProdutoUCTest.execute({
            codigoProduto: "PAABBBBBBCCC",
            valor: 2100,
            nomeProduto: "Samsung Galaxy S22FE",
            marca: "",
            descricaoProduto: "Smartphone com Y memória X câmera",
            pesoGramas: 310.00,
            alturaCM: 3.0,
            larguraCM: 16.20, 
            comprimentoCM: 7.2,
        })).rejects.toThrow("É necessário inserir uma marca")
    })
});