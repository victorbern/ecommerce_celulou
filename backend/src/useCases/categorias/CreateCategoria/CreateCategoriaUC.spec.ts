import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { createCategoriaUCTest } from ".";

describe("Testando a classe CreateCategoriaUC", () => {
    inMemoryCategoriasRepository.items = [];

    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "Basico"
        }
    ]

    test("Deve ser possível criar uma categoria", () => {
        expect(createCategoriaUCTest.execute({
            nomeCategoria: "Topo de linha"
        }).then(() => {
            expect(inMemoryCategoriasRepository.items[1].codigoCategoria).toHaveLength(12);
            expect(inMemoryCategoriasRepository.items[1].nomeCategoria).toBe("Topo de linha")
        }));
    });

    test("Não deve ser possível criar uma categoria com nome que já está cadastrado", () => {
        expect(createCategoriaUCTest.execute({
            nomeCategoria: "Basico"
        })).rejects.toThrow("Esta categoria já existe");
    });

    test("Não deve ser possível criar uma categoria -> testando se o zod está sendo ativado", () => {
        expect(createCategoriaUCTest.execute({
            nomeCategoria: ""
        })).rejects.toThrow("É necessário inserir um nome para a categoria");
    });
});