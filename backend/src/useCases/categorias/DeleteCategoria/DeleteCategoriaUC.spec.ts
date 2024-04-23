import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { deleteCategoriaUCTest } from ".";
import { InMemoryCategoriasRepository } from "../../../repositories/in-memory/InMemoryCategoriasRepository";
import { DeleteCategoriaUC } from "./DeleteCategoriaUC";

describe("Testando a classe DeleteCategoriaUC", () => {
    inMemoryCategoriasRepository.items = [];

    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "TCCAAABBBCCC",
            nomeCategoria: "Basico"
        },
        {
            codigoCategoria: "TAAABBBBCCCC",
            nomeCategoria: "Intermediario"
        }
    ]

    test("Deve ser possível deletar uma categoria", () => {
        expect(deleteCategoriaUCTest.execute({
            codigoCategoria: "TCCAAABBBCCC"
        }).then(() => {
            expect(inMemoryCategoriasRepository.items).toHaveLength(1)
        })).resolves
    });

    test("Não deve ser possivel deletar uma categoria porque ela nao existe", () => {
        expect(deleteCategoriaUCTest.execute({
            codigoCategoria: "AAABBBCCCDDD"
        })).rejects.toThrow("Categoria não encontrada!")
    })
})