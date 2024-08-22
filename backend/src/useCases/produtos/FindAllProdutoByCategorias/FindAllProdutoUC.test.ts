import { beforeAll, describe, expect, it, vi } from "vitest";
import { IProdutoDTO } from "../../../entities/EntitiesDTO/ProdutoDTO";
import { produtoFactoryTest } from "../../../factories/index.test";
import { produtosRepositoryMocked } from "../../../repositories/implementations/index.test";

const findAllProdutoUC = produtoFactoryTest.useCases.findAllProdutoUseCase();

const produtos: IProdutoDTO[] = [
    {
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
    },
    {
        codigoProduto: "PBBCCCDDDEEE",
        nomeProduto: "Xiaomi Redmi Note 11",
        marca: "Xiaomi",
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
        ],
        quantidadeEstoque: 20,
        imagensFolder: "PAABBBCCCDDD/",
        nota: 0,
        isDisponivelCompra: false,
        isVisivel: false
    }
]

describe("Testando a classe FindAllProcutoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar todos os produtos", async () => {
        produtosRepositoryMocked.getAll.mockResolvedValue(produtos);

        const response = await findAllProdutoUC.execute();

        expect(response).toEqual(produtos);
    });

    it("Não deve ser possível buscar todos os produtos caso não exista nenhum produto", async () => {
        produtosRepositoryMocked.getAll.mockResolvedValue(null);
        
        const response = await findAllProdutoUC.execute();

        expect(response).toBeNull();
    })
});
