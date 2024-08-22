import { beforeAll, describe, expect, it, vi } from "vitest";
import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.mocks";
import { produtoFactoryTest } from "../../../factories/index.mocks";

const findProdutoUCTest = produtoFactoryTest.useCases.findProdutoUseCase();

const produtoDTO: IProdutoDTO = {
    codigoProduto: "PAABBBCCCDDD",
    nomeProduto: "Samsung Galaxy S23",
    marca: "Samsung",
    descricaoProduto: "",
    pesoGramas: 200.0,
    alturaCM: 2,
    comprimentoCM: 20,
    larguraCM: 10,
    valor: 2000,
    categorias: [
        {
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "Nome da categoria"
        },
        {
            codigoCategoria: "TBBCCCDDDEEE",
            nomeCategoria: "Categoria 2"
        }
    ],
    quantidadeEstoque: 20,
    imagensFolder: "PAABBBCCCDDD/",
    nota: 0,
    isDisponivelCompra: false,
    isVisivel: false
}

describe("Testando a classe FindProdutoUC", async () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar um produto pelo código", async () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(produtoDTO);

        const response = await findProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        });

        expect(response).toEqual({
            ...produtoDTO
        });

        expect(produtosRepositoryMocked.getByCodigo).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível buscar um produto com código nulo ou undefined", () => {
        expect(findProdutoUCTest.execute({
            codigoProduto: null
        })).rejects.toThrow("Código inválido")

        expect(findProdutoUCTest.execute({
            codigoProduto: undefined
        })).rejects.toThrow("Código inválido")
    });

    it("Não deve ser possível buscar um produto caso ele não exista", async () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(null);

        const response = await findProdutoUCTest.execute({
            codigoProduto: "PBBCCCDDDEEE"
        });

        expect(response).toBeNull();
    });
});