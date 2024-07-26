import { describe, expect, test, vi } from "vitest";
import { inMemoryAlteracaoEstoqueRepository, inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { createAlteracaoEstoqueUCTest } from ".";
import { InMemoryAlteracaoEstoqueRepository } from "../../../repositories/in-memory/InMemoryAlteracaoEstoqueRepository";
import { CreateAlteracaoEstoqueUC } from "./CreateAlteracaoEstoqueUC";
import { findEstoqueUCTest } from "../../estoques/FindEstoque";

describe("Testando a classe CreateAlteracaoUC", () => {
    // Zerando a base de AlteracaoEstoque
    inMemoryAlteracaoEstoqueRepository.items = [];
    
    test("Deve ser possível criar uma alteração de estoque", () => {
        // Criando um estoque para testes
        inMemoryEstoquesRepository.items = [{ codigoEstoque: "FAABBBCCCDDD", quantidade: 20, codigoProduto: "PAABBBCCCDDD" }];
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD",
            valorAlteracao: -2
        }).then((result) => {
            expect(result.message).toBe("Alteração do estoque salva com sucesso!")
            expect(inMemoryAlteracaoEstoqueRepository.items[0].codigoAlteracaoEstoque).toBe(result.codigoAlteracaoEstoque);

            expect(inMemoryAlteracaoEstoqueRepository.items[0].codigoEstoque).toBe("FAABBBCCCDDD");
            expect(inMemoryAlteracaoEstoqueRepository.items[0].valorAlteracao).toBe(-2);
        })).resolves
    })

    test("Não deve ser possível criar uma alteração de estoque sem enviar um código de estoque", () => {
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: undefined,
            valorAlteracao: -2
        })).rejects.toThrow("Código do estoque inválido!");
    })

    test("Não deve ser possível criar uma alteração de estoque para um estoque que não existe", () => {
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "FBBCCCDDDEEE",
            valorAlteracao: 2
        })).rejects.toThrow("Estoque não encontrado!")
    });

    test("Não deve ser possível criar uma AlteracaoEstoque sem enviar um valor de alteração nulo (testando o zod)", () => {
        // Adicionando um estoque para teste
        inMemoryEstoquesRepository.items = [{ codigoEstoque: "FAABBBCCCDDD", quantidade: 20, codigoProduto: "PAABBBCCCDDD" }];
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD",
            valorAlteracao: null
        })).rejects.toThrow("O valor de alteração precisa ser um número inteiro")
    })

    test("Testando se a AlteracaoEstoque é capturada pelo catch e apagada ao dar erro", () => {
        const inMemoryAlteracaoEstoqueRepository2 = new InMemoryAlteracaoEstoqueRepository;

        vi.spyOn(inMemoryAlteracaoEstoqueRepository2, 'save').mockImplementation(async (alteracaoEstoque) => {
            // Simule a operação de salvar no "banco de dados".
            inMemoryAlteracaoEstoqueRepository2.items.push(alteracaoEstoque);
            // Simule um erro após salvar.
            throw new Error('Erro!');
          });
        const createAlteracaoEstoqueUCTest2 = new CreateAlteracaoEstoqueUC(inMemoryAlteracaoEstoqueRepository2, findEstoqueUCTest);
        // Removendo todas as alterações de estoque para testar
        inMemoryAlteracaoEstoqueRepository2.items = [];
        // Adicionando um estoque para teste
        inMemoryEstoquesRepository.items = [{ codigoEstoque: "FAABBBCCCDDD", quantidade: 20, codigoProduto: "PAABBBCCCDDD" }];

        expect(createAlteracaoEstoqueUCTest2.execute({
            codigoEstoque: "FAABBBCCCDDD",
            valorAlteracao: 2
        })).rejects.toThrow("Erro!").then(() => {
            expect(inMemoryAlteracaoEstoqueRepository2.items).toHaveLength(0)
        })
    })
})