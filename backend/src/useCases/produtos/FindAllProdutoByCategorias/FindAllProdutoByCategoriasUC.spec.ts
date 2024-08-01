import { describe, expect, test } from "vitest";
import { Produto } from "../../../entities/Produto";
import { Categoria } from "../../../entities/Categoria";
import { ProdutoHasCategoria } from "../../../entities/ProdutoHasCategoria";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { findAllProdutoByCategoriasUCTest } from ".";

describe("Testando a classe FindAllProdutoByCategoriasUC", () => {
    // Criando categorias para teste
    const categorias: Categoria[] = [
        {
            codigoCategoria: "TAABBBCCCDDD",
            nomeCategoria: "A"
        },
        {
            codigoCategoria: "TBBCCCDDDEEE",
            nomeCategoria: "B"
        },
        {
            codigoCategoria: "TCCDDDEEEFFF",
            nomeCategoria: "C"
        },
    ];

    // Criando produtos para teste 
    const produtos: Produto[] = [
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
            isDisponivelCompra: false,
            categorias: []
        },
        {
            codigoProduto: "PBBCCCDDDEEE",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 11 Pro",
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
            categorias: []
        },
        {
            codigoProduto: "PCCDDDEEEFFF",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 12 Pro",
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
            categorias: []
        },
    ];

    // Criando ligações entre produtos e categorias
    const produtoHasCategoriaBanco: ProdutoHasCategoria[] = [
        {
            codigoProduto: "PAABBBCCCDDD",
            codigoCategoria: "TAABBBCCCDDD"
        },
        {
            codigoProduto: "PAABBBCCCDDD",
            codigoCategoria: "TBBCCCDDDEEE"
        },
        {
            codigoProduto: "PAABBBCCCDDD",
            codigoCategoria: "TCCDDDEEEFFF"
        },
        {
            codigoProduto: "PBBCCCDDDEEE",
            codigoCategoria: "TAABBBCCCDDD"
        },
        {
            codigoProduto: "PBBCCCDDDEEE",
            codigoCategoria: "TCCDDDEEEFFF"
        },
        {
            codigoProduto: "PCCDDDEEEFFF",
            codigoCategoria: "TAABBBCCCDDD"
        },
    ];

    inMemoryProdutosRepository.setCategoriasBanco(categorias);
    inMemoryProdutosRepository.items = produtos;
    inMemoryProdutosRepository.setProdutoHasCategoriaBanco(produtoHasCategoriaBanco);

    
    test("Deve ser possível buscar os produtos com base em várias categorias", () => {
        expect(findAllProdutoByCategoriasUCTest.execute({
            categorias: ["TAABBBCCCDDD", "TBBCCCDDDEEE"]
        }).then((result) => {
            // console.log(result);
            expect(result).toHaveLength(1);
            expect(result[0].codigoProduto).toBe("PAABBBCCCDDD");
            expect(result[0].categorias[0].codigoCategoria).toBe("TAABBBCCCDDD")
        })).resolves
    });

    test("Deve ser possível buscar os produtos com base em uma categoria", () => {
        expect(findAllProdutoByCategoriasUCTest.execute({
            categorias: ["TCCDDDEEEFFF"],
        }).then((result) => {
            expect(result).toHaveLength(2);
            expect(result[0].codigoProduto).toBe("PAABBBCCCDDD");
            expect(result[1].codigoProduto).toBe("PBBCCCDDDEEE");
        })).resolves;
    });

    test("Deve ser possível buscar todos os produtos caso não envie nenhuma categoria", () => {
        expect(findAllProdutoByCategoriasUCTest.execute({
            categorias: []
        }).then((result) => {
            expect(result).toHaveLength(3);
        }));
    });

    test("Não deve ser possível buscar nenhum produto caso uma das categorias não exista", () => {
        expect(findAllProdutoByCategoriasUCTest.execute({
            categorias: ["TAABBBCCCDDD", "TABCDEFGHIJL"]
        }).then((result) => {
            expect(result).toHaveLength(0);
        }))
    })
})