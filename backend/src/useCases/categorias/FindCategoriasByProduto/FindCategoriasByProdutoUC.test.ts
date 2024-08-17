import { beforeAll, describe, expect, it, vi } from "vitest";
import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { Categoria } from "../../../entities/Categoria";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/index.test";
import { produtoFactoryTest } from "../../../factories/index.test";
import { FindCategoriasByProdutoUC } from "./FindCategoriasByProdutoUC";

const produtoExistsUCTest = produtoFactoryTest.useCases.produtoExistsUseCase();
const findCategoriasByProdutoUCTest = new FindCategoriasByProdutoUC(categoriasRepositoryMocked, produtoExistsUCTest);

const produtoDTO: IProdutoDTO = {
    codigoProduto: "PAABBBCCCDDD",
    valor: 2080.99,
    nomeProduto: "Xiaomi Redmi Note 10 Pro",
    marca: "Xioami",
    descricaoProduto: "Smartphone com X memória Y câmera",
    imagensFolder: "/produtos/PAABBBCCCDDD/",
    nota: 4.8,
    pesoGramas: 230.00,
    alturaCM: 2.8,
    larguraCM: 15.00,
    comprimentoCM: 6.9,
    isVisivel: false,
    isDisponivelCompra: false,
    categorias: [],
    quantidadeEstoque: 0
}

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

describe("Testando a classe FindCategoriasByProdutoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar todas as categorias de um produto", async () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(true);

        categoriasRepositoryMocked.getByCodigoProduto.mockResolvedValue(categoriasDTO);

        const response = await findCategoriasByProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        });
        
        expect(response).toEqual(categoriasDTO)

        expect(categoriasRepositoryMocked.getByCodigoProduto).toHaveBeenCalledOnce();
    });

    it("Não deve ser possível buscar as categorias de um produto caso o código do produto não seja enviado", () => {
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: undefined
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível buscar as categorias de um produto caso o produto não exista", () => {
        vi.spyOn(produtoExistsUCTest, 'execute').mockResolvedValue(false);
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        })).rejects.toThrow("Produto não encontrado!");
    });
})