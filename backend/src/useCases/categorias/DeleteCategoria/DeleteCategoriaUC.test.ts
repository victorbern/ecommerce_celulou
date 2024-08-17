import { beforeAll, describe, expect, it, vi } from "vitest";
import { Categoria } from "../../../entities/Categoria";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/index.test";
import { categoriaFactoryTest } from "../../../factories/index.test";

const deleteCategoriaUCTest = categoriaFactoryTest.useCases.deleteCategoriaUseCase();

const categoriaDTO: Categoria = {
    codigoCategoria: "TAABBBCCCDDD",
    nomeCategoria: "Básico"
}

describe("Testando a classe DeleteCategoriaUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível deletar uma categoria", async () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(categoriaDTO);

        const response = await deleteCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD",
        });

        expect(response).toEqual({
            message: "Categoria deletada com sucesso!"
        });

        expect(categoriasRepositoryMocked.delete).toHaveBeenCalledOnce();
        expect(categoriasRepositoryMocked.delete).toHaveBeenCalledWith(expect.any(String));
    });

    it("Não deve ser possível deletar uma categoria caso o código não seja enviado", () => {
        expect(deleteCategoriaUCTest.execute({
            codigoCategoria: undefined
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível deletar uma categoria caso a categoria não exista", () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(null);

        expect(deleteCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD"
        })).rejects.toThrow("Categoria não encontrada!");
    });
})