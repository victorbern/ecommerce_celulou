import { describe, expect, test } from "vitest";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { updateEnderecoUCTest } from ".";

describe("Testando a classe UpdateEnderecoUC", () => {
    inMemoryEnderecosRepository.items = [];

    inMemoryEnderecosRepository.items = [
        {
            codigoEndereco: "EQQWWWEEERRR",
            cep: "12970568",
            nomeRua: "Rua 2",
            numeroCasa: "11",
            complemento: "",
            bairro: "Jardim das Palmeiras",
            cidade: "Paraty",
            estado: "Rio de Janeiro",
            codigoCliente: "CRRTTTQQQRRR",
        }
    ];

    test("Deve ser possível atualizar os dados de um endereço", () => {
        expect(updateEnderecoUCTest.execute({
            codigoEndereco: "EQQWWWEEERRR",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "10",
            complemento: "Apartamento 2C",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo"
        }).then(() => {
            expect(inMemoryEnderecosRepository.items[0].codigoEndereco).toBe("EQQWWWEEERRR");
            expect(inMemoryEnderecosRepository.items[0].cep).toBe("12970000");
            expect(inMemoryEnderecosRepository.items[0].nomeRua).toBe("Rua 1");
            expect(inMemoryEnderecosRepository.items[0].numeroCasa).toBe("10");
            expect(inMemoryEnderecosRepository.items[0].complemento).toBe("Apartamento 2C");
            expect(inMemoryEnderecosRepository.items[0].bairro).toBe("Centro");
            expect(inMemoryEnderecosRepository.items[0].cidade).toBe("Piracaia");
            expect(inMemoryEnderecosRepository.items[0].estado).toBe("São Paulo");
        }));
    });

    test("Não deve ser possivel atualizar os dados de um endereço porque o endereço não existe", () => {
        expect(updateEnderecoUCTest.execute({
            codigoEndereco: "ELLKKKJJJHHH",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "10",
            complemento: "Apartamento 2C",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo"
        })).rejects.toThrow("Endereço não encontrado!");
    });

    test("Não deve ser possível atualizar os dados de um endereço porque algum dos dados enviado é inválido", () => {
        // Testando se o Zod está validando corretamente   
        expect(updateEnderecoUCTest.execute({
            codigoEndereco: "EQQWWWEEERRR",
            cep: "",
            nomeRua: "Rua 1",
            numeroCasa: "10",
            complemento: "Apartamento 2C",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo"
        })).rejects.toThrow("O tamanho do cep precisa ser de 8 caracteres");
    });
})