import { describe, expect, test } from "vitest";
import { Estoque } from "./Estoque";

describe("Testando a entidade Estoque", () => {
    test("Deve ser possível criar um objeto de estoque", () => {
        expect(new Estoque({
            codigoEstoque: "SAABBBCCCDDD",
            codigoProduto: "PAABBBCCCDDD",
            quantidade: 2,
        })).satisfies

        // Testando se é possivel salvar um estoque como zero
        expect(new Estoque({
            codigoEstoque: "SBBCCCDDDEEE",
            codigoProduto: "PBBCCCDDDEEE",
            quantidade: 0
        })).satisfies
    });

    describe("Testando o código do estoque", () => {
        test("Não deve ser possível criar um objeto de Estoque com o código com uma quantidade de caracteres diferente de 12", () => {
            expect(() => {
                new Estoque({
                    codigoEstoque: "SAABBBCCCDDDD",
                    codigoProduto: "PAABBBCCCDDD",
                    quantidade: 0
                })
            }).toThrow("O tamanho do código precisa ser de 12 caracteres");
        });

        test("Não deve ser possível criar um objeto de Estoque com o código com uma quantidade de caracteres diferente de 12", () => {
            expect(() => {
                new Estoque({
                    codigoEstoque: "SAAB",
                    codigoProduto: "PAABBBCCCDDD",
                    quantidade: 0
                })
            }).toThrow("O tamanho do código precisa ser de 12 caracteres");
        })

        test("Não deve ser possível criar um objeto de Estoque com o código com um tipo diferente de string", () => {
            expect(() => {
                new Estoque({
                    codigoEstoque: null,
                    codigoProduto: "PAABBBCCCDDD",
                    quantidade: 0
                })
            }).toThrow("O código precisa ser uma string");
        })
    });
})