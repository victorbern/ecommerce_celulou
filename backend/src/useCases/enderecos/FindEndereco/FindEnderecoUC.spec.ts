import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository, inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { findEnderecoUCTest } from ".";

describe("Testando a classe FindEnderecoUC", () => {
    inMemoryEnderecosRepository.items = [];

    inMemoryEnderecosRepository.items = [
        {
            codigoEndereco: "EQQWWWEEERRR",
            nomeEndereco: "Casa",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "Cksjskslsksls"
        }
    ];

    test("Deve ser possível buscar um endereço", () => {
        expect(findEnderecoUCTest.execute({
            codigoEndereco: "EQQWWWEEERRR"
        })).resolves.toStrictEqual(
            {
                codigoEndereco: "EQQWWWEEERRR",
                nomeEndereco: "Casa",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "44B",
                complemento: "",
                bairro: "Centro",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "Cksjskslsksls"
            }
        );
    });

    test("Não deve ser possível buscar um endereço porque o código do endereço é inválido", () => {
        expect(findEnderecoUCTest.execute({
            codigoEndereco: null
        })).rejects.toThrow("Código inválido");
    });

    test("Não deve ser possível buscar um endereço porque não há nenhum com o código enviado", () => {
        expect(findEnderecoUCTest.execute({
            codigoEndereco: "AAABBBCCCDDD"
        })).resolves.toBeNull();
    })

})