import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository, inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { createEnderecoUCTest } from ".";

describe("Testando a classe CreateEnderecoUC", () => {
    inMemoryEnderecosRepository.items = [];
    inMemoryClientesRepository.items = [];

    inMemoryClientesRepository.items = [
        {
            "codigoCliente": "Cksjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": new Date(Date.now()),
        }
    ]

    test("Should be able to save an address", () => {
        expect(createEnderecoUCTest.execute({
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "Cksjskslsksls"
        }).then(() => {
            expect(inMemoryEnderecosRepository.items[0].codigoEndereco).toHaveLength(12)
            expect(inMemoryEnderecosRepository.items[0].cep).toBe("12970000");
            expect(inMemoryEnderecosRepository.items[0].nomeRua).toBe("Rua 1");
            expect(inMemoryEnderecosRepository.items[0].numeroCasa).toBe("44B");
            expect(inMemoryEnderecosRepository.items[0].bairro).toBe("Centro");
            expect(inMemoryEnderecosRepository.items[0].cidade).toBe("Piracaia");
            expect(inMemoryEnderecosRepository.items[0].estado).toBe("São Paulo");
            expect(inMemoryEnderecosRepository.items[0].codigoCliente).toBe("Cksjskslsksls");
        })).resolves

        // Tentando cadastrar um endereço com caracteres especiais no cep
        expect(createEnderecoUCTest.execute({
            cep: "12970-000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "Cksjskslsksls"
        }).then(() => {
            expect(inMemoryEnderecosRepository.items[1].cep).toBe("12970000")
        })).resolves
    });

    test("Should not be able to create an address because the client does not exist", () => {
        expect(createEnderecoUCTest.execute({
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "CWWEEERRRTTT"
        })).rejects.toThrow("Cliente não encontrado!")
    });

    test("Should not be able to create an address because the data is wrong", () => {
        // Testando se o Zod está funcionando
        expect(createEnderecoUCTest.execute({
            cep: "12970000",
            nomeRua: "",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "Cksjskslsksls"
        })).rejects.toThrow("É necessário inserir uma rua")
    })

})