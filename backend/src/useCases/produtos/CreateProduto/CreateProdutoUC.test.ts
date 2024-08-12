import { beforeAll, describe, expect, it, vi } from "vitest";
import { ICreateProdutoRequestDTO } from "./CreateProdutoDTO";
import { createProdutoUCTest } from ".";
import { createEstoqueUCTest } from "../../estoques/CreateEstoque";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { Produto } from "../../../entities/Produto";

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

const produtoDTO: ICreateProdutoRequestDTO = {
    nomeProduto: "Samsung Galaxy S23",
    marca: "Samsung",
    descricaoProduto: "",
    pesoGramas: 200.0,
    alturaCM: 2,
    comprimentoCM: 20,
    larguraCM: 10,
    valor: 2000,
    categorias: [],
    quantidadeEstoque: 20
}

describe("Testando a classe CreateProdutoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível criar um produto", async () => {
        vi.spyOn(createEstoqueUCTest, 'execute').mockResolvedValue({
            message: "Estoque criado com sucesso!",
            codigoEstoque: "FAABBBCCCDDD"
        })
        const response = await createProdutoUCTest.execute({
            ...produtoDTO
        });

        expect(response).toEqual({
            message: "Produto cadastrado com sucesso",
            codigoProduto: "P12345678901"
        });

        expect(produtosRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Produto));
        expect(createEstoqueUCTest.execute).toHaveBeenCalledOnce();
    });

    it("")
})