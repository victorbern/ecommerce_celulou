import { describe, expect, test } from "vitest";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { deleteEnderecoUCTest } from ".";

describe("Testando a classe DeleteEnderecoUC", () => {
    inMemoryEnderecosRepository.items = [];

    inMemoryEnderecosRepository.items = [
        {
            codigoEndereco: "EQQWWWEEERRR",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "C12312323123"
        },
        {
            codigoEndereco: "EAQWWWEEERRR",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "C12312323123"
        },
    ];

    test("Deve ser possível conseguir apagar um endereço", () => {
        expect(deleteEnderecoUCTest.execute({
            codigoEndereco: "EQQWWWEEERRR"
        }).then(() => {
            expect(inMemoryEnderecosRepository.items).toHaveLength(1);
        }));
    })

    test("Não deve ser possível conseguir apagar um endereço porque ele não existe", () => {
        expect(deleteEnderecoUCTest.execute({
            codigoEndereco: "EEEQQQRRRTTT"
        })).rejects.toThrow("Endereço não encontrado!");
    });

})