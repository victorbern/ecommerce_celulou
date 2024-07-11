import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository, inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { delClienteUCTest } from ".";

describe("Testando a classe DelClienteUC", () => {
    inMemoryClientesRepository.items = [];

    inMemoryClientesRepository.items = [
        {
            "codigoCliente": "Cksjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": new Date(Date.now()),
        },
        {
            "codigoCliente": "Casjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": new Date(Date.now()),
        }
    ]

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
        },
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
    ]

    test("Deve ser possivel deletar um cliente com vários endereços cadastrados", () => {
        // Cliente que possui endereços
        expect(delClienteUCTest.execute({
            codigoCliente: "Cksjskslsksls"
        }).then(() => {
            expect(inMemoryClientesRepository.items.length).toBe(1);
            expect(inMemoryEnderecosRepository.items).toHaveLength(0);
        }))
    });

    test("Deve ser possivel deletar um cliente que não tem nenhum endereço cadastrado", () => {
        // Cliente que não possui endereços
        expect(delClienteUCTest.execute({
            codigoCliente: "Casjskslsksls"
        }).then(() => {
            expect(inMemoryClientesRepository.items.length).toBe(0);
            expect(inMemoryEnderecosRepository.items).toHaveLength(0);
        }))
    });

    test("Should note be able to delete a cliente", () => {
        // Tentando deletar um cliente que não existe
        expect(delClienteUCTest.execute({
            codigoCliente: "CXXZZZYYYWWW"
        })).rejects.toThrow("Cliente não encontrado!");

        // Tentando deletar um cliente passando nulo como parâmetro
        expect(delClienteUCTest.execute({
            codigoCliente: null
        })).rejects.toThrow("Cliente não encontrado!")

        // Tentando deletar um cliente passando undefined como parâmetro
        expect(delClienteUCTest.execute({
            codigoCliente: undefined
        })).rejects.toThrow("Cliente não encontrado!")
    })
})