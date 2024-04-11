import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { updateClienteUCTest } from ".";

describe("Testes para a classe UpdateClienteUC", () => {
    inMemoryClientesRepository.items = [];

    inMemoryClientesRepository.items = [
        {
            "codigoCliente": "Cksjskslsksl",
            "nomeCliente": "Victor Oliveira",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": new Date(Date.now()),
        },
        {
            "codigoCliente": "Cqwertyuiopa",
            "nomeCliente": "Lucas Bernardo",
            "cpfCliente": "21074126009",
            "celularCliente": "11965845462",
            "emailCliente": "bernardo@gmail.com",
            "createdAt": new Date(Date.now()), 
        }
    ]

    test("Should be able to update a Client", () => {
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "760.153.100-73",
            celularCliente: "11956365698", emailCliente: "victor2@gmail.com"
        }).then(() => {
            expect(inMemoryClientesRepository.items[0].nomeCliente).toStrictEqual("Victor Bernardo");
            expect(inMemoryClientesRepository.items[0].cpfCliente).toStrictEqual("76015310073");
            expect(inMemoryClientesRepository.items[0].celularCliente).toStrictEqual("11956365698");
            expect(inMemoryClientesRepository.items[0].emailCliente).toStrictEqual("victor2@gmail.com");
        })).resolves
    });

    test("Should not be able to update a Cliente", () => {
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "760.153.100-73",
            celularCliente: "11956365698", emailCliente: "victor2@gmail.com"
        }))

        // Tentando alterar um cliente com cpf inválido
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "111.111.111-11",
            celularCliente: "11956365698", emailCliente: "victor2@gmail.com"
        })).rejects.toThrow("O CPF é Inválido");

        // Tentando alterar um cliente que não existe
        expect(updateClienteUCTest.execute({
            codigoCliente: "CXXYYYZZZWWW", nomeCliente: "Victor Bernardo", cpfCliente: "760.153.100-73",
            celularCliente: "11956365698", emailCliente: "victor2@gmail.com"
        })).rejects.toThrow("Cliente não encontrado");

        // Testando validações do Zod (passando um e-mail inválido)
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "760.153.100-73",
            celularCliente: "11956365698", emailCliente: "victor"
        })).rejects.toThrow("Endereço de e-mail inválido!");

        // Tentando alterar o cpf para um que já exista no banco de dados
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "210.741.260-09",
            celularCliente: "11956365698", emailCliente: "victor2@gmail.com"
        })).rejects.toThrow("O novo cpf informado já está cadastrado");

        // Tentando alterar o e-mail para um que já exista no banco de dados
        expect(updateClienteUCTest.execute({
            codigoCliente: "Cksjskslsksl", nomeCliente: "Victor Bernardo", cpfCliente: "760.153.100-73",
            celularCliente: "11956365698", emailCliente: "bernardo@gmail.com"
        })).rejects.toThrow("O novo e-mail informado já está cadastrado");
    })

})