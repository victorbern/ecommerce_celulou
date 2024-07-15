import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository, inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { ProdutoHasCategoria } from "@prisma/client";
import { findCategoriasByProdutoUCTest } from ".";

describe("Testando a classe FindCategoriasByProdutoUC", () => {
    // Criando algumas categorias para teste
    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "ALSKSDBBBCCC",
            nomeCategoria: "Intermediario"
        },
        {
            codigoCategoria: "BLSKSDBBBCCC",
            nomeCategoria: "Memória"
        },
        {
            codigoCategoria: "CLSKSDBBBCCC",
            nomeCategoria: "Câmera"
        }
    ]

    // Criando alguns produtos para teste
    inMemoryProdutosRepository.items = [
        {
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
            isDisponivelCompra: false
        },
        {
            codigoProduto: "AAABBBCCCDDD",
            valor: 2080.99,
            nomeProduto: "Samsung Galaxy S21",
            marca: "Samsung",
            descricaoProduto: "Smartphone com X memória Y câmera",
            imagensFolder: "/produtos/AAABBBCCCDDD/",
            nota: 4.8,
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9,
            isVisivel: false,
            isDisponivelCompra: false
        },
        {
            codigoProduto: "BBBCCCDDDEEE",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 11 Pro",
            marca: "Xioami",
            descricaoProduto: "Smartphone com X memória Y câmera",
            imagensFolder: "/produtos/BBBCCCDDDEEE/",
            nota: 4.8,
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9,
            isVisivel: false,
            isDisponivelCompra: false
        }
    ]

    // Criando alguns ProdutoHasCategoria para teste
    const produtoHasCategoriaList: ProdutoHasCategoria[] = [
        {
            codigoCategoria: "ALSKSDBBBCCC",
            codigoProduto: "PAABBBCCCDDD"
        },
        {
            codigoCategoria: "BLSKSDBBBCCC",
            codigoProduto: "PAABBBCCCDDD"
        },
        {
            codigoCategoria: "ALSKSDBBBCCC",
            codigoProduto: "AAABBBCCCDDD"
        }
    ];

    // Adicionando o ProdutoHasCategoria ao banco em memória de categorias
    inMemoryCategoriasRepository.setProdutoHasCategoriaBanco(produtoHasCategoriaList);

    test("Deve ser possível consultar todas as categorias de um produto", () => {
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: "PAABBBCCCDDD"
        }).then((result) => {
            expect(result[0].codigoCategoria).toStrictEqual("ALSKSDBBBCCC")
            expect(result[1].codigoCategoria).toStrictEqual("BLSKSDBBBCCC")
        })).resolves
    });

    test("Não deve retornar nenhuma categoria porque o produto não possui nenhuma", () => {
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: "BBBCCCDDDEEE"
        }).then((result) => {
            expect(result).toHaveLength(0);
        }))
    });

    test("Não deve ser possível consultar as categorias de um produto porque o código do produto é inválido", () => {
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: null
        })).rejects.toThrow("Código inválido!")
    })

    test("Não deve ser possível procurar as categorias de um produto porque o produto não existe", () => {
        expect(findCategoriasByProdutoUCTest.execute({
            codigoProduto: "CCCDDDEEEFFF"
        })).rejects.toThrow("Produto não encontrado!")
    })
})