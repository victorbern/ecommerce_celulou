import { beforeAll, describe, expect, it, vi } from "vitest";
import { Categoria } from "../../../entities/Categoria";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/index.test";
import { categoriaFactoryTest } from "../../../factories/index.test";

const updateCategoriaUCTest = categoriaFactoryTest.useCases.updateCategoriaUseCase();

const categoriaAntigaDTO: Categoria = {
    codigoCategoria: "TAABBBCCCDDD",
    nomeCategoria: "Intermediario"
}

const categoriaNovaDTO: Categoria = {
    codigoCategoria: "TAABBBCCCDDD",
    nomeCategoria: "Básico"
}


describe("Testando a classe UpdateCategoriaUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível atualizar os dados de uma categoria", async () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(categoriaAntigaDTO);

        const response = await updateCategoriaUCTest.execute({
            ...categoriaNovaDTO
        });

        expect(response).toEqual({
            message: "Dados atualizados com sucesso!"
        });

        expect(categoriasRepositoryMocked.update).toHaveBeenCalledWith(expect.any(Categoria))
    });

    it("Não deve ser possível atualizar os dados de uma categoria se nenhum código for enviado", () => 
        expect(updateCategoriaUCTest.execute({
            codigoCategoria: undefined,
            nomeCategoria: "Básico"
        })).rejects.toThrow("Código inválido")
    );

    it("Não deve ser possível atualizar os dados de uma categoria que não existe", () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(null);

        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "Top de linha"
        })).rejects.toThrow("Categoria não encontrada!");
    });

    it("Não deve ser possível atualizar os dados de uma categoria caso um dos dados seja inválido (testando o zod)", () => {
        categoriasRepositoryMocked.getByCodigo.mockResolvedValue(categoriaAntigaDTO);

        expect(updateCategoriaUCTest.execute({
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: ""
        })).rejects.toThrow("É necessário inserir um nome para a categoria")
    })
})