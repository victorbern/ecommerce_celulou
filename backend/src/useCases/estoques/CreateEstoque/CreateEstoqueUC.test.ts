import { beforeAll, describe, expect, it, vi } from "vitest";
import { produtoFactoryTest } from "../../../factories/index.test";
import { CreateEstoqueUC } from "./CreateEstoqueUC";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/index.test";
import { Estoque } from "../../../entities/Estoque";

const produtoExistsUCTest = produtoFactoryTest.useCases.produtoExistsUseCase();
const createEstoqueUCTest = new CreateEstoqueUC(estoquesRepositoryMocked, produtoExistsUCTest);

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

const estoqueDTO: Estoque = {
    codigoEstoque: "FAABBBCCCDDD",
    codigoProduto: "PAABBBCCCDDD",
    quantidade: 20
}

describe("Testando a classe CreateEstoqueUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível criar um estoque", async () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue(null);

        const response = await createEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            quantidade: 12
        });

        expect(response).toEqual({
            message: "Estoque criado com sucesso!",
            codigoEstoque: "F12345678901"
        });

        expect(estoquesRepositoryMocked.save).toHaveBeenCalledOnce();
        expect(estoquesRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Estoque));
    });

    it("Caso o produto já possua um estoque cadastrado deverá retornar o código do estoque", async () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);
        estoquesRepositoryMocked.getByProduto.mockResolvedValue(estoqueDTO);

        const response = await createEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            quantidade: 10
        });

        expect(response).toEqual({
            message: "Este produto já possui estoque",
            codigoEstoque: "FAABBBCCCDDD"
        })
    });

    it("Não deve ser possível criar um estoque caso a quantidade inicial seja menor do que zero", () => {
        expect(createEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            quantidade: -1
        })).rejects.toThrow("Quantidade inválida!")
    });

    it("Não deve ser possível criar um estoque caso o código do produto seja inválido", () => {
        // Testando com código do produto nulo 
        expect(createEstoqueUCTest.execute({
            codigoProduto: null,
            quantidade: 2
        })).rejects.toThrow("Código de produto inválido");

        // Testando com código do produto undefined
        expect(createEstoqueUCTest.execute({
            codigoProduto: undefined,
            quantidade: 2
        })).rejects.toThrow("Código de produto inválido");

        // Testando com código do produto vazio
        expect(createEstoqueUCTest.execute({
            codigoProduto: "",
            quantidade: 2
        })).rejects.toThrow("Código de produto inválido");
    });

    it("Não deve ser possível criar um estoque caso o produto não exista", () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(null);

        expect(createEstoqueUCTest.execute({
            codigoProduto: "PAABBBCCCDDD",
            quantidade: 2
        })).rejects.toThrow("Produto não encontrado!");
    });
})