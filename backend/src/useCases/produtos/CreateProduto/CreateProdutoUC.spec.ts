import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository, inMemoryEstoquesRepository, inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { createProdutoUCTest } from ".";

describe("Testando a classe CreateProdutoUC", () => {
    inMemoryProdutosRepository.items = [];
    inMemoryEstoquesRepository.items = [];

    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "Intermediario"
        },
        {
            codigoCategoria: "TBBCCCDDDEEE",
            nomeCategoria: "Memória"
        }
    ]



    test("Deve ser possivel criar um produto", () => {
        inMemoryProdutosRepository.items = [];
        inMemoryEstoquesRepository.items = [];
        // Testando com valores normais
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00,
            comprimentoCM: 6.9,
            categorias: [
                {
                    codigoCategoria: "TAABBBCCCDDD",
                    nomeCategoria: "Intermediario"
                },
                {
                    codigoCategoria: "TBBCCCDDDEEE",
                    nomeCategoria: "Memória"
                }
            ],
            quantidadeEstoque: 2
        }).then((result) => {
            expect(result.codigoProduto).toBe(inMemoryProdutosRepository.items[0].codigoProduto);
            expect(result.message).toBe("Produto cadastrado com sucesso")

            expect(inMemoryProdutosRepository.items[0].valor).toBe(2080.99);
            expect(inMemoryProdutosRepository.items[0].nomeProduto).toBe("Xiaomi Redmi Note 10 Pro");
            expect(inMemoryProdutosRepository.items[0].marca).toBe("Xiaomi");
            expect(inMemoryProdutosRepository.items[0].descricaoProduto).toBe("Smartphone com X memória Y câmera");
            expect(inMemoryProdutosRepository.items[0].nota).toBeNull();
            expect(inMemoryProdutosRepository.items[0].pesoGramas).toBe(230.00);
            expect(inMemoryProdutosRepository.items[0].alturaCM).toBe(2.8);
            expect(inMemoryProdutosRepository.items[0].larguraCM).toBe(15.00);
            expect(inMemoryProdutosRepository.items[0].comprimentoCM).toBe(6.9);
            expect(inMemoryProdutosRepository.items[0].isDisponivelCompra).toBeFalsy();
            expect(inMemoryProdutosRepository.items[0].isVisivel).toBeFalsy();

            expect(inMemoryProdutosRepository.produtoHasCategoriaBanco[0].codigoCategoria).toBe("TAABBBCCCDDD")
            expect(inMemoryProdutosRepository.produtoHasCategoriaBanco[1].codigoCategoria).toBe("TBBCCCDDDEEE")

            expect(inMemoryEstoquesRepository.items[0].codigoProduto).toBe(result.codigoProduto)
            expect(inMemoryEstoquesRepository.items[0].quantidade).toBe(2);

            // Testando a pasta imagensFolder
            expect(inMemoryProdutosRepository.items[0].imagensFolder).toBe("/produtos/" + inMemoryProdutosRepository.items[0].codigoProduto + "/")
        })).resolves;
    });

    test("Deve ser possível criar um produto com os valores zerados", () => {
        inMemoryProdutosRepository.items = [];
        inMemoryEstoquesRepository.items = [];
        expect(createProdutoUCTest.execute({
            valor: 0,
            nomeProduto: "Xiaomi Redmi Note 12 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 0,
            alturaCM: 0,
            larguraCM: 0,
            comprimentoCM: 0,
            categorias: [],
            quantidadeEstoque: 0
        }).then((result) => {
            expect(result.codigoProduto).toBe(inMemoryProdutosRepository.items[0].codigoProduto);
            expect(result.message).toBe("Produto cadastrado com sucesso")

            expect(inMemoryProdutosRepository.items[0].valor).toBe(0);
            expect(inMemoryProdutosRepository.items[0].nomeProduto).toBe("Xiaomi Redmi Note 12 Pro");
            expect(inMemoryProdutosRepository.items[0].marca).toBe("Xiaomi");
            expect(inMemoryProdutosRepository.items[0].descricaoProduto).toBe("Smartphone com X memória Y câmera");
            expect(inMemoryProdutosRepository.items[0].nota).toBeNull();
            expect(inMemoryProdutosRepository.items[0].pesoGramas).toBe(0);
            expect(inMemoryProdutosRepository.items[0].alturaCM).toBe(0);
            expect(inMemoryProdutosRepository.items[0].larguraCM).toBe(0);
            expect(inMemoryProdutosRepository.items[0].comprimentoCM).toBe(0);
            expect(inMemoryProdutosRepository.items[0].isDisponivelCompra).toBeFalsy();
            expect(inMemoryProdutosRepository.items[0].isVisivel).toBeFalsy();

            // Testando a pasta imagensFolder
            expect(inMemoryProdutosRepository.items[0].imagensFolder).toBe("/produtos/" + inMemoryProdutosRepository.items[0].codigoProduto + "/")
        })).resolves
    })

    test("Não deve ser possível criar um produto com algum dos dados inválidos (testando se o zod está validando os dados)", () => {
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9,
            categorias: [],
            quantidadeEstoque: 0
        })).rejects.toThrow("É necessário inserir um nome para o produto")
    });

    test("Não deve ser possível criar um produto caso alguma das categorias não exista", () => {
        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9,
            categorias: [
                {
                    codigoCategoria: "TAABBBCCCDDD",
                    nomeCategoria: "Intermediario",
                },
                {
                    codigoCategoria: "TXXAAAXXXBBB",
                    nomeCategoria: "Câmera"
                }
            ],
            quantidadeEstoque: 0
        })).rejects.toThrow("A categoria 'Câmera' não existe")
    })

    test("Verificando se os dados estão sendo deletados caso ocorra algum erro", () => {
        inMemoryEstoquesRepository.items = [];
        inMemoryProdutosRepository.items = [];
        inMemoryProdutosRepository.produtoHasCategoriaBanco = [];
        inMemoryProdutosRepository.estoques = [];

        expect(createProdutoUCTest.execute({
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xiaomi",
            descricaoProduto: "Smartphone com X memória Y câmera",
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00,
            comprimentoCM: 6.9,
            categorias: [
                {
                    codigoCategoria: "TAABBBCCCDDD",
                    nomeCategoria: "Intermediario"
                },
                {
                    codigoCategoria: "TBBCCCDDDEEE",
                    nomeCategoria: "Memória"
                }
            ],
            quantidadeEstoque: -2
        }).then(() => {

        })).rejects.toSatisfy(() => {
            return inMemoryProdutosRepository.items.length === 0 ? true : false;
        });
    })
})