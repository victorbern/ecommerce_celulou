import { beforeAll, describe, expect, it, vi } from "vitest";
import { ICreateProdutoRequestDTO } from "./CreateProdutoDTO";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.mocks";
import { Produto } from "../../../entities/Produto";
import { categoriaFactoryTest, estoqueFactoryTest, produtoFactoryTest } from "../../../factories/index.mocks";
import { CreateProdutoUC } from "./CreateProdutoUC";

const createEstoqueUCTest = estoqueFactoryTest.useCases.createEstoqueUseCase(produtoFactoryTest);
const categoriaExistsUCTest = categoriaFactoryTest.useCases.categoriaExistsUseCase();

const createProdutoUCTest = new CreateProdutoUC(produtosRepositoryMocked, categoriaExistsUCTest, createEstoqueUCTest);

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

        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(true);

        const response = await createProdutoUCTest.execute({
            ...produtoDTO
        });

        expect(response).toEqual({
            message: "Produto cadastrado com sucesso",
            codigoProduto: "P12345678901"
        });

        expect(produtosRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Produto));
        expect(createEstoqueUCTest.execute).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.addCategoria).toHaveBeenCalledTimes(2);
    });

    it("Não deve ser possível cadastrar um novo produto porque uma das categorias não existe", () => {
        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(false);

        expect(createProdutoUCTest.execute({
            ...produtoDTO,
            categorias: [
                {
                    codigoCategoria: "TAABBBCCCDDD",
                    nomeCategoria: "Nome da categoria"
                }
            ]
        })).rejects.toThrow("A categoria 'Nome da categoria' não existe");
    });

    it("Deve desfazer tudo o que foi feito porque ocorreu um erro ao cadastrar o produto", async () => {
        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(true);

        produtosRepositoryMocked.removeAllCategorias.mockClear();
        produtosRepositoryMocked.deleteEstoque.mockClear();
        produtosRepositoryMocked.delete.mockClear();
        produtosRepositoryMocked.save.mockRejectedValue("Erro");

        await createProdutoUCTest.execute({
            ...produtoDTO,
        }).catch(erro => erro)

        expect(produtosRepositoryMocked.removeAllCategorias).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.deleteEstoque).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.delete).toHaveBeenCalledOnce();
    })

    it("Deve desfazer tudo o que foi feito porque ocorreu um erro ao adicionar uma categoria ao produto", async () => {
        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(true);

        produtosRepositoryMocked.removeAllCategorias.mockClear();
        produtosRepositoryMocked.deleteEstoque.mockClear();
        produtosRepositoryMocked.delete.mockClear();
        produtosRepositoryMocked.addCategoria.mockRejectedValue("Erro categoria");

        await createProdutoUCTest.execute({
            ...produtoDTO,
        }).catch(erro => erro)

        expect(produtosRepositoryMocked.removeAllCategorias).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.deleteEstoque).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.delete).toHaveBeenCalledOnce();
    });

    it("Deve desfazer tudo o que foi feito porque ocorreu um erro ao criar um novo estoque", async () => {
        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(true);

        produtosRepositoryMocked.removeAllCategorias.mockClear();
        produtosRepositoryMocked.deleteEstoque.mockClear();
        produtosRepositoryMocked.delete.mockClear();
        vi.spyOn(createEstoqueUCTest, 'execute').mockRejectedValue("Erro estoque");

        await createProdutoUCTest.execute({
            ...produtoDTO,
        }).catch(erro => erro)

        expect(produtosRepositoryMocked.removeAllCategorias).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.deleteEstoque).toHaveBeenCalledOnce();
        expect(produtosRepositoryMocked.delete).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível criar um novo produto porque um dos dados é inválido (testando se o zod está funcionando)", () => {
        vi.spyOn(categoriaExistsUCTest, 'execute').mockResolvedValue(true);

        expect(createProdutoUCTest.execute({
            ...produtoDTO,
            nomeProduto: ""
        })).rejects.toThrow("É necessário inserir um nome para o produto")
    })
})