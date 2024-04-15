import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository, inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { findEnderecoByClienteUCTest } from ".";

describe("Testando a classe FindEnderecoByClienteUC", () => {
    inMemoryEnderecosRepository.items = [];
    inMemoryClientesRepository.items = [];

    // Criando clientes para teste
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
            "codigoCliente": "Casdlkgjhfkd",
            "nomeCliente": "Andre",
            "cpfCliente": "95309949070",
            "celularCliente": "119563465864",
            "emailCliente": "andre@gmail.com",
            "createdAt": new Date(Date.now()),
        }
    ];

    // Criando endereços para teste
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
            codigoCliente: "Cksjskslsksls"
        },
        {
            codigoEndereco: "ELLLKKKKJJJJ",
            cep: "12945654",
            nomeRua: "Rua 2",
            numeroCasa: "11",
            complemento: "",
            bairro: "Centro",
            cidade: "São José dos Campos",
            estado: "São Paulo",
            codigoCliente: "Cksjskslsksls"
        }
    ];

    test("Deve ser possivel localizar um ou varios enderecos", () => {
        expect(findEnderecoByClienteUCTest.execute({
            codigoCliente: "Cksjskslsksls"
        })).resolves.toStrictEqual([
            {
                codigoEndereco: "EQQWWWEEERRR",
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
                codigoEndereco: "ELLLKKKKJJJJ",
                cep: "12945654",
                nomeRua: "Rua 2",
                numeroCasa: "11",
                complemento: "",
                bairro: "Centro",
                cidade: "São José dos Campos",
                estado: "São Paulo",
                codigoCliente: "Cksjskslsksls"
            }
        ])
    });

    test("Nao deve ser possivel localizar enderecos porque o cliente nao existe", () => {
        expect(findEnderecoByClienteUCTest.execute({
            codigoCliente: "CWWWEEEERRRR"
        })).rejects.toThrow("Cliente não encontrado!");
    });

    test("Nao deve localizar nenhum endereço, pois o cliente informado nao possui endereco cadastrado", () => {
        expect(findEnderecoByClienteUCTest.execute({
            codigoCliente: "Casdlkgjhfkd"
        })).resolves.toHaveLength(0);
    })
})