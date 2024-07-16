import { describe, expect, test } from "vitest";
import { inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { findEstoqueUCTest } from ".";

describe("Testando a classe FindEstoqueUC", () => {
    inMemoryEstoquesRepository.items = [
        {
            codigoEstoque: "FAABBBCCCDDD",
            quantidade: 2,
            codigoProduto: "PAABBBCCCDDD"
        },
        {
            codigoEstoque: "FBBCCCDDDEEE",
            quantidade: 0,
            codigoProduto: "PBBCCCDDDEEE"
        }
    ];

    test("Deve ser possível buscar um estoque pelo código", () => {
        expect(findEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD"
        }).then((result) => {
            expect(result.codigoEstoque).toBe("FAABBBCCCDDD");
            expect(result.quantidade).toBe(2);
            expect(result.codigoProduto).toBe("PAABBBCCCDDD")
        }));
    });

    test("Não deve ser possível buscar um estoque porque não tem estoques no banco de dados", () => {
        inMemoryEstoquesRepository.items = [];
        expect(findEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD"
        })).resolves.toBeNull();
    });

    test("Não deve ser possível buscar um estoque porque o código é inválido", () => {
        expect(findEstoqueUCTest.execute({
            codigoEstoque: null
        })).rejects.toThrow("Código inválido!")
    })
})