import { describe, expect, test } from "vitest";
import { AlteracaoEstoque } from "./AlteracaoEstoque";

describe("Testando a entidade AlteracaoEstoque", () => {

    test("Deve ser possível criar uma AlteracaoEstoque", () => {
        expect(new AlteracaoEstoque({
            codigoAlteracaoEstoque: "GAABBBCCCDDD",
            valorAlteracao: 20,
            dataAlteracao: new Date(Date.now()),
            codigoEstoque: "EAABBBCCCDDD"
        })).satisfies
    });

    test("Deve ser possível criar uma Alteracao com valorAlteracao negativa", () => {
        expect(new AlteracaoEstoque({
            codigoAlteracaoEstoque: "GAABBBCCCDDD",
            valorAlteracao: -20,
            dataAlteracao: new Date(Date.now()),
            codigoEstoque: "EAABBBCCCDDD"
        })).satisfies
    })

    test("Não deve ser possível criar uma AlteracaoEstoque com código vazio", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "",
                valorAlteracao: 20,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("O código precisa ser de 12 caracteres")
    });

    test("Não deve ser possível criar uma AlteracaoEstoque com código com tamanho diferente de 12 caracteres", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "ABC",
                valorAlteracao: 20,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("O código precisa ser de 12 caracteres");
    });

    test("Não deve ser possível criar uma AlteracaoEstoque sem enviar um valor de alteração", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: undefined,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("É necessário inserir um valor de alteração");
    })

    test("Não deve ser possível criar uma AlteracaoEstoque com um valor de alteração nulo", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: null,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("O valor de alteração precisa ser um número inteiro");
    });

    test("Não deve ser possível criar uma AlteracaoEstoque com um valor de alteração diferente de inteiro", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 20.2,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("O valor de alteração precisa ser um número inteiro");
    });

    test("Não deve ser possível criar uma AlteracaoEstoque com um valor de alteração igual a zero", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 0,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("O valor de alteração não pode ser zero");
    });

    test("Não deve ser possível criar uma AlteracaoEstoque sem enviar uma data de alteração", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 20,
                dataAlteracao: undefined,
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("É necessário inserir uma data de alteração")
    })

    test("Não deve ser possível criar uma AlteracaoEstoque com uma data de alteração sem ser do tipo Date", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 20,
                dataAlteracao: null,
                codigoEstoque: "EAABBBCCCDDD"
            })
        }).toThrow("A data de alteração deve ser do tipo Date")
    });

    test("Não deve ser possível criar uma AlteracaoEstoque sem enviar um código de estoque", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 20,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: undefined
            })
        }).toThrow("É necessário inserir um código do estoque")
    })

    test("Não deve ser possível criar uma AlteracaoEstoque com um código de estoque com um tipo diferente de string", () => {
        expect(() => {
            new AlteracaoEstoque({
                codigoAlteracaoEstoque: "GAABBBCCCDDD",
                valorAlteracao: 20,
                dataAlteracao: new Date(Date.now()),
                codigoEstoque: null
            })
        }).toThrow("O código do estoque precisa ser uma string")
    });
})