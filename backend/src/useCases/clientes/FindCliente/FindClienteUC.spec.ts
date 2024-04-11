import { describe, expect, test } from "vitest";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { findClienteUCTest } from ".";

describe("Testando a classe FindClienteUC", () => {
    inMemoryClientesRepository.items = [];

    const date = new Date(Date.now());

    inMemoryClientesRepository.items = [
        {
            "codigoCliente": "Cksjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": date,
        }
    ];

    test("Should be able to bring a client", () => {
        expect(findClienteUCTest.execute({
            codigoCliente: "Cksjskslsksls"
        }).then((result) => {
            expect(result.codigoCliente).toStrictEqual("Cksjskslsksls");
            expect(result.nomeCliente).toStrictEqual("Victor");
            expect(result.cpfCliente).toStrictEqual("25402037019");
            expect(result.celularCliente).toStrictEqual("11964758393");
            expect(result.emailCliente).toStrictEqual("victor@gmail.com");
            expect(result.createdAt).toBe(date);
        })).resolves
    });

    test("Should not be able to bring a client", () => {
        // Enviando apenas parte de um código de cliente
        expect(findClienteUCTest.execute({
            codigoCliente: "Cksjsksls"
        }).then((result) => {
            expect(result).toBeNull();
        }));

        // Enviando um código inválido
        expect(findClienteUCTest.execute({
            codigoCliente: null
        })).rejects.toThrow("Código inválido");
    })
})