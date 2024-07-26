import { describe, expect, test, vi } from "vitest";
import { inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { alterarEstoqueUCTest } from ".";
import { InMemoryEstoquesRepository } from "../../../repositories/in-memory/InMemoryEstoquesRepository";
import { AlterarEstoqueUC } from "./AlterarEstoqueUC";
import { createAlteracaoEstoqueUCTest } from "../../alteracao_estoque/CreateAlteracaoEstoque";

describe("Testando a classe AlterarEstoqueUC", () => {
    inMemoryEstoquesRepository.items = [];

    inMemoryEstoquesRepository.items = [
        {
            codigoEstoque: "GAABBBCCCDDD",
            quantidade: 2,
            codigoProduto: "PAABBBCCCDDD"
        }
    ]

    test("Deve ser possível alterar a quantidade de um estoque", () => {
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -2
        })).resolves
    })

    test("Não deve ser possível alterar a quantidade de um estoque porque o estoque não existe", () => {
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "GBBCCCDDDEEE",
            valorAlteracao: 2,
        })).rejects.toThrow("Estoque não encontrado!")
    });

    test("Não deve ser possível alterar a quantidade de estoque porque a quantidade é insuficiente", () => {
        inMemoryEstoquesRepository.items = [{ codigoEstoque: "GCCDDDEEEFFF", quantidade: 2, codigoProduto: "PAABBBCCCDDD" }]
        expect(alterarEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -3
        })).rejects.toThrow("Estoque insuficiente!")
    });

    test("Teste para ver se o estoque volta para seu valor inicial ao acontecer um erro", () => {
        const inMemoryEstoquesRepository2 = new InMemoryEstoquesRepository;
        inMemoryEstoquesRepository2.items = [{ codigoEstoque: "GCCDDDEEEFFF", quantidade: 10, codigoProduto: "PAABBBCCCDDD" }]

        vi.spyOn(inMemoryEstoquesRepository2, 'alterarEstoque').mockImplementation(async (codigoEstoque, quantidade) => {
            // Simule a operação de alterar a quantidade  no "banco de dados".
            for (let i in inMemoryEstoquesRepository2.items) {
                if (inMemoryEstoquesRepository2.items[i].codigoEstoque === codigoEstoque) {
                    inMemoryEstoquesRepository2.items[i].quantidade = quantidade;
                    throw new Error('Erro!');
                }
            }
            return null;
        });

        const alterarEstoqueUCTest2 = new AlterarEstoqueUC(inMemoryEstoquesRepository2, createAlteracaoEstoqueUCTest);

        expect(alterarEstoqueUCTest2.execute({
            codigoProduto: "PAABBBCCCDDD",
            valorAlteracao: -3
        })).rejects.toThrow("Erro!").then(() => {
            expect(inMemoryEstoquesRepository2.items[0].quantidade).toBe(10);
        })
    });
})