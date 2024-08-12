import { beforeAll, describe, expect, it, vi } from "vitest";
import { Categoria } from "../../../entities/Categoria";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { findCategoriaUCTest } from ".";

const categoriaDTO: Categoria = {
    codigoCategoria: "TAABBBCCCDDD",
    nomeCategoria: "Intermediario"
}

describe("Testando a classe FindCategoriaUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar uma categoria pelo código", async () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(categoriaDTO);

        const response = await findCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD"
        });

        expect(response).toEqual(categoriaDTO);

        expect(categoriasRepositoryMocked.getByCodigo).toHaveBeenCalledWith(expect.any(String));
    });

    it("Não deve ser possível buscar uma categoria pelo código se o código fornecido for inválido", () => {
        expect(findCategoriaUCTest.execute({
            codigoCategoria: undefined
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível buscar uma categoria pelo código caso a categoria não exista", async () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(null);

        const response = await findCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD"
        });

        expect(response).toBeNull();
    })
})