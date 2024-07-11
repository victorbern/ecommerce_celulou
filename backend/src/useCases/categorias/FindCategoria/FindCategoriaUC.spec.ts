import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { findCategoriaUCTest } from ".";

describe("Testando a classe FindCategoriaUC", () => {
    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "ABCDEFABCDEF",
            nomeCategoria: "Intermediarios"
        }
    ];

    test("Deve ser possível retornar um cliente", () => {
        expect(findCategoriaUCTest.execute({
            codigoCategoria: "ABCDEFABCDEF"
        }).then((result) => {
            expect(result.codigoCategoria).toStrictEqual("ABCDEFABCDEF");
            expect(result.nomeCategoria).toStrictEqual("Intermediarios");
        })).resolves
    })

    test("Não deve ser possível retornar uma categoria porque o código não é válido", () => {
        // Enviando apenas parte de um código de categoria
        expect(findCategoriaUCTest.execute({
            codigoCategoria: "ABCDEFABC"
        }).then((result) => {
            expect(result).toBeNull();
        }))

        // Enviando um código nulo
        expect(findCategoriaUCTest.execute({
            codigoCategoria: null
        })).rejects.toThrow("Código inválido!")
    })
})