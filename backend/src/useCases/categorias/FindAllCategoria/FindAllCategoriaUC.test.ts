import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Categoria } from "../../../entities/Categoria";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { findAllCategoriaUCTest } from ".";

const categoriasDTO: Categoria[] = [
    {
        codigoCategoria: "TQQEEERRRTTT",
        nomeCategoria: "Basico"
    },
    {
        codigoCategoria: "TEERRRTTTQQQ",
        nomeCategoria: "Intermediario"
    },
    {
        codigoCategoria: "TPPAAALLLSSS",
        nomeCategoria: "Intermediario Premium"
    }
]

describe("Testando a classe FindAllCategoriaUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível retornar todas as categorias (sem usar filtro)", () => {
        categoriasRepositoryMocked.getAll.mockResolvedValue(categoriasDTO);

        expect(findAllCategoriaUCTest.execute({
            filtro: ""
        })).resolves.toEqual(categoriasDTO);

        // Enviando com filtro undefined
        expect(findAllCategoriaUCTest.execute({
            filtro: undefined
        })).resolves.toEqual(categoriasDTO);

        expect(categoriasRepositoryMocked.getAll).toHaveBeenCalledTimes(2);
        expect(categoriasRepositoryMocked.getAllWithFilter).toHaveBeenCalledTimes(0);
        
    });

    it("Deve ser possível retornar todas as categorias (usando filtro)", () => {
        categoriasRepositoryMocked.getAll.mockClear();
        categoriasRepositoryMocked.getAllWithFilter.mockClear();
        categoriasRepositoryMocked.getAllWithFilter.mockResolvedValue(categoriasDTO);

        expect(findAllCategoriaUCTest.execute({
            filtro: "a"
        })).resolves.toEqual(categoriasDTO);

        expect(categoriasRepositoryMocked.getAllWithFilter).toHaveBeenCalledTimes(1);
        expect(categoriasRepositoryMocked.getAll).toHaveBeenCalledTimes(0);
    });
})