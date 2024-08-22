import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Estoque } from "../../../entities/Estoque";
import { estoqueFactoryTest } from "../../../factories/index.test";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/index.test";

const findEstoqueUCTest = estoqueFactoryTest.useCases.findEstoqueUseCase(); 

const estoqueDTO: Estoque = {
    codigoEstoque: "FAABBBCCCDDD",
    codigoProduto: "PAABBBCCCDDD",
    quantidade: 10
}

describe("Testando a classe FindEstoqueUC", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("Deve ser possível buscar um estoque", async () => {
        estoquesRepositoryMocked.getByCodigo.mockResolvedValue(estoqueDTO);

        const response = await findEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD"
        });

        expect(response).toEqual(estoqueDTO);
        expect(estoquesRepositoryMocked.getByCodigo).toHaveBeenCalledOnce();
        expect(estoquesRepositoryMocked.getByCodigo).toHaveBeenCalledWith(expect.any(String));
    });

    it("Não deve ser possível buscar um estoque caso o código do estoque seja inválido", () => {
        // Testando com código do estoque nulo
        expect(findEstoqueUCTest.execute({
            codigoEstoque: null
        })).rejects.toThrow("Código inválido!");

        // Testando com código do estoque undefined
        expect(findEstoqueUCTest.execute({
            codigoEstoque: undefined
        })).rejects.toThrow("Código inválido!");

        // Testando com código do estoque vazio
        expect(findEstoqueUCTest.execute({
            codigoEstoque: ""
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível buscar um estoque que não existe", async () => {
        estoquesRepositoryMocked.getByCodigo.mockResolvedValue(null);

        const response = await findEstoqueUCTest.execute({
            codigoEstoque: "FAABBBCCCDDD"
        });

        expect(response).toBeNull();
        expect(estoquesRepositoryMocked.getByCodigo).toHaveBeenCalledOnce();
    })
})