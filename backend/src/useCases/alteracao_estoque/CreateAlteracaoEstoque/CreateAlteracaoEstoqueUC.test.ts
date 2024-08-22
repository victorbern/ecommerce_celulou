import { beforeAll, describe, expect, it, vi } from "vitest";
import { alteracaoEstoqueFactoryTest, estoqueFactoryTest } from "../../../factories/index.mocks";
import { CreateAlteracaoEstoqueUC } from "./CreateAlteracaoEstoqueUC";
import { alteracaoEstoqueRepositoryMocked } from "../../../repositories/implementations/index.mocks";

const estoqueExistsUCTest = estoqueFactoryTest.useCases.estoqueExistsUseCase();
const createAlteracaoEstoqueUCTest = new CreateAlteracaoEstoqueUC(alteracaoEstoqueRepositoryMocked, estoqueExistsUCTest);

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

describe("Testando a classe CreateAlteracaoEstoqueUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível criar uma alteração no estoque", async () => {
        vi.spyOn(estoqueExistsUCTest, 'execute').mockResolvedValue(true);

        const response = await createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "EAABBBCCCDDD",
            valorAlteracao: 20
        });

        expect(response).toEqual({
            message: "Alteração do estoque salva com sucesso!",
            codigoAlteracaoEstoque: "G12345678901"
        })

        expect(alteracaoEstoqueRepositoryMocked.save).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível criar uma alteração no estoque caso o código do estoque seja inválido", () => {
        // Testando com código do estoque nulo
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: null,
            valorAlteracao: 1
        })).rejects.toThrow("Código do estoque inválido!");

        // Testando com código do estoque undefined
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: undefined,
            valorAlteracao: 2
        })).rejects.toThrow("Código do estoque inválido!");

        // Testando com código do estoque vazio
        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "",
            valorAlteracao: 2
        })).rejects.toThrow("Código do estoque inválido!");

    });

    it("Não deve ser possível criar uma alteração no estoque porque o estoque não existe", () => {
        vi.spyOn(estoqueExistsUCTest, 'execute').mockResolvedValue(false);

        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "EAABBBCCCDDD",
            valorAlteracao: 2
        })).rejects.toThrow("Estoque não encontrado!");
    });

    it("Deve apagar a alteração de estoque do banco caso ocorra algum erro", async () => {
        vi.spyOn(estoqueExistsUCTest, 'execute').mockResolvedValue(true);

        alteracaoEstoqueRepositoryMocked.save.mockClear();
        alteracaoEstoqueRepositoryMocked.delete.mockClear();
        alteracaoEstoqueRepositoryMocked.save.mockRejectedValue("Erro");

        await createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "EAABBBCCCDDD",
            valorAlteracao: 2
        }).catch(erro => erro);

        expect(alteracaoEstoqueRepositoryMocked.save).toHaveBeenCalledOnce();
        expect(alteracaoEstoqueRepositoryMocked.delete).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível criar uma alteração no estoque caso algum dos dados seja inválido (testando o zod)", () => {
        vi.spyOn(estoqueExistsUCTest, 'execute').mockResolvedValue(true);

        expect(createAlteracaoEstoqueUCTest.execute({
            codigoEstoque: "EAABBBCCCDDD",
            valorAlteracao: 0
        })).rejects.toThrow("O valor de alteração não pode ser zero");
    })
})