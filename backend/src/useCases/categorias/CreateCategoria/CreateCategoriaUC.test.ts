import { beforeAll, describe, expect, it, vi } from "vitest";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { Categoria } from "../../../entities/Categoria";
import { createCategoriaUCTest } from ".";

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

const categoriaDTO: Categoria = {
    codigoCategoria: "TAABBBCCCDDD",
    nomeCategoria: "Intermediario"
}

describe("Testando a classe CreateCategoriaUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível criar uma nova categoria", async () => {
        categoriasRepositoryMocked.getByName.mockResolvedValue(null);

        const response = await createCategoriaUCTest.execute({
            nomeCategoria: "Intermediario"
        });

        expect(response).toEqual({
            message: "Categoria cadastrada com sucesso!",
            codigoCategoria: "T12345678901"
        });

        expect(categoriasRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Categoria));
    });

    it("Não deve ser possível criar uma nova categoria caso o nome inserido seja inválido", () => {
        expect(createCategoriaUCTest.execute({
            nomeCategoria: undefined
        })).rejects.toThrow("Nome da categoria inválida");
    });

    it("Não deve ser possível criar uma nova categoria caso o nome inserido já esteja em uso por outra categoria", () => {
        categoriasRepositoryMocked.getByName.mockResolvedValue(categoriaDTO);

        expect(createCategoriaUCTest.execute({
            nomeCategoria: categoriaDTO.nomeCategoria
        })).rejects.toThrow("Esta categoria já existe")
    });
})