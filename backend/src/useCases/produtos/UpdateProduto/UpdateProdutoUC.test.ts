import { beforeAll, describe, expect, it, vi } from "vitest";
import { Produto } from "../../../entities/Produto";
import { IUpdateProdutoRequestDTO } from "./UpdateProdutoDTO";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.mocks";
import { produtoFactoryTest } from "../../../factories/index.mocks";

const updateProdutoUCTest = produtoFactoryTest.useCases.updateProdutoUseCase();

const produtoAntigoDTO: Produto = {
    codigoProduto: "PAABBBCCCDDD",
    nomeProduto: "Samsung Galaxy S23",
    marca: "Samsung",
    descricaoProduto: "",
    pesoGramas: 200.0,
    alturaCM: 2,
    comprimentoCM: 20,
    larguraCM: 10,
    valor: 2000,
    imagensFolder: "PAABBBCCCDDD/",
    nota: 0,
    isDisponivelCompra: false,
    isVisivel: false
}

const produtoNovoDTO: IUpdateProdutoRequestDTO = {
    codigoProduto: "PAABBBCCCDDD",
    nomeProduto: "Redmi Note 11",
    marca: "Xiaomi",
    descricaoProduto: "",
    pesoGramas: 300.0,
    alturaCM: 1.8,
    comprimentoCM: 21,
    larguraCM: 11,
    valor: 2100,
    categorias: [
        {
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "Intermediario"
        },
        {
            codigoCategoria: "TBBCCCDDDEEE",
            nomeCategoria: "Memória"
        }
    ]
} 

describe("Testando a classe UpdateProdutoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível atualizar os dados de produto", async () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(produtoAntigoDTO);

        const response = await updateProdutoUCTest.execute({
            ...produtoNovoDTO,
        });

        expect(response).toEqual({
            message: "Dados atualizados com sucesso!"
        });
    });

    it("Não deve ser possível atualizar os dados de um produto caso o código seja inválido", () => {
        expect(updateProdutoUCTest.execute({
            ...produtoNovoDTO,
            codigoProduto: null
        })).rejects.toThrow("Código inválido!");

        expect(updateProdutoUCTest.execute({
            ...produtoNovoDTO,
            codigoProduto: undefined
        })).rejects.toThrow("Código inválido!");

        expect(updateProdutoUCTest.execute({
            ...produtoNovoDTO,
            codigoProduto: ""
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível atualizar os dados de um produto caso o produto não exista", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(null);
        expect(updateProdutoUCTest.execute({
            ...produtoNovoDTO,
        codigoProduto: "PAABBBCCCDDD"
        })).rejects.toThrow("Produto não encontrado");
    });

    it("Não deve ser possível atualizar os dados de um produto caso um dos dados seja inválido (testando o zod)", () => {
        produtosRepositoryMocked.getByCodigo.mockResolvedValue(produtoAntigoDTO);

        expect(updateProdutoUCTest.execute({
            ...produtoNovoDTO,
            nomeProduto: ""
        })).rejects.toThrow("É necessário inserir um nome para o produto")
    })
});