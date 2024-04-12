import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { delClienteUCTest } from ".";

describe("Testando a classe DelClienteUC", () => {
    inMemoryClientesRepository.items = [];

    inMemoryClientesRepository.items = [{
        "codigoCliente": "Cksjskslsksls",
        "nomeCliente": "Victor",
        "cpfCliente": "25402037019",
        "celularCliente": "11964758393",
        "emailCliente": "victor@gmail.com",
        "createdAt": new Date(Date.now()),
    }]

    test("Should be able to delete a client", () => {
        expect(delClienteUCTest.execute({
            codigoCliente: "Cksjskslsksls"
        }).then(() => {
            expect(inMemoryClientesRepository.items.length).toBe(0);
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