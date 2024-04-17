import { describe, expect, test } from "vitest";
import { Categoria } from "./Categoria";

describe("Testando a entidade Categoria", () => {

    test("Deve ser possível criar uma categoria", () => {
        expect(new Categoria({
            codigoCategoria: "TASDSASDASDA",
            nomeCategoria: "Tecnologia"
        })).satisfies;
    });

    test("Não deve ser possivel criar categoria com o codigo vazio", () => {
        expect(() => {
            new Categoria({
                codigoCategoria: "",
                nomeCategoria: "Intermediário"
            })
        }).toThrow("O código precisa ter 12 caracteres");
    })

    
    test("Não deve ser possivel criar categoria com o codigo com tamanho diferente de 12 caracteres", () => {
        expect(() => {
            new Categoria({
                codigoCategoria: "ABC",
                nomeCategoria: "Intermediário"
            })
        }).toThrow("O código precisa ter 12 caracteres");
    });

    
    test("Não deve ser possivel criar categoria com o nome vazio", () => {
        expect(() => {
            new Categoria({
                codigoCategoria: "ABCDEFABCDEF",
                nomeCategoria: ""
            })
        }).toThrow("É necessário inserir um nome para a categoria");
    });
})