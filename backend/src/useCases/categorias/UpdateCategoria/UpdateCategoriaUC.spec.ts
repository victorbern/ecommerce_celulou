import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { updateCategoriaUCTest } from ".";

describe("Testando a classe UpdateCategoriaUC", () => {
    inMemoryCategoriasRepository.items = [];

    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "TAASSSDDDQQQ",
            nomeCategoria: "Basicos"
        },
        {
            codigoCategoria: "TBBBSSSSDDDD",
            nomeCategoria: "Intermediarios"
        }
    ];

    test("Deve ser possivel atualizar os dados de uma categoria", () => {
        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TAASSSDDDQQQ", nomeCategoria: "Top de Linha"
        }).then(() => {
            expect(inMemoryCategoriasRepository.items[0].nomeCategoria).toBe("Top de Linha")
        })).resolves
    });

    test("Não deve ser possível atualizar os dados de uma categoria porque a categoria não existe", () => {
        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TAAABBBBCCCC", nomeCategoria: "Intermediario Premium"
        })).rejects.toThrow("Categoria não encontrada!");
    });

    test("Não deve ser possível atualizar os dados de uma categoria porque um dos dados enviados é inválido", () => {
        expect(updateCategoriaUCTest.execute({
            codigoCategoria: null, nomeCategoria: "Basico"
        })).rejects.toThrow("Categoria não encontrada!");

        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TBBBSSSSDDDD", nomeCategoria: null
        })).rejects.toThrow("O nome da categoria precisa ser uma string");

        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TBBBSSSSDDDD", nomeCategoria: ""
        })).rejects.toThrow("É necessário inserir um nome para a categoria");
    })
})