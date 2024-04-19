import { describe, expect, test } from "vitest";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { findAllCategoriaUCTest } from ".";

describe("Testando a classe FindAllCategoriaUC", () => {
    inMemoryCategoriasRepository.items = [];

    inMemoryCategoriasRepository.items = [
        {
            codigoCategoria: "TQQEEERRRTTT",
            nomeCategoria: "Basico"
        },
        {
            codigoCategoria: "TEERRRTTTQQQ",
            nomeCategoria: "Intermediario"
        },
        {
            codigoCategoria: "PPPAAALLLSSS",
            nomeCategoria: "Intermediario Premium"
        }
    ]

    test("Deve ser possível achar todas as categorias (sem usar filtro)", () => {
        expect(findAllCategoriaUCTest.execute({filtro: null})).resolves.toStrictEqual(
            [
                {
                    codigoCategoria: "TQQEEERRRTTT",
                    nomeCategoria: "Basico"
                },
                {
                    codigoCategoria: "TEERRRTTTQQQ",
                    nomeCategoria: "Intermediario"
                },
                {
                    codigoCategoria: "PPPAAALLLSSS",
                    nomeCategoria: "Intermediario Premium"
                }
            ]
        )
    });

    test("Deve ser possível achar ao menos uma categoria (usando filtro)", () => {
        expect(findAllCategoriaUCTest.execute({ filtro: "Inter"})).resolves.toStrictEqual(
            [
                {
                    codigoCategoria: "TEERRRTTTQQQ",
                    nomeCategoria: "Intermediario"
                },
                {
                    codigoCategoria: "PPPAAALLLSSS",
                    nomeCategoria: "Intermediario Premium"
                }
            ]
        )
    });

    test("Não deve ser possível achar nenhuma categoria (usando filtro)", () => {
        expect(findAllCategoriaUCTest.execute({filtro: "Teste"})).resolves.toHaveLength(0);

    })

    test("Não deve ser possível achar nenhuma categoria (sem usar filtro)", () => {
        inMemoryCategoriasRepository.items = [];

        expect(findAllCategoriaUCTest.execute({filtro: null})).resolves.toHaveLength(0);
    })

})