import {describe, expect, test} from 'vitest'
import { inMemoryClientesRepository } from '../../../repositories/in-memory';
import { createClienteUCTest } from '.';
import { decriptarSenhaUC } from '../../../utils/DecriptarSenha';
import { encriptarSenhaUC } from '../../../utils/EncriptarSenha';

describe("Testando a classe CreateClienteUC", () => {
    inMemoryClientesRepository.items = [];

    test("Should be able to create a client", () => {
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "546.892.760-80", celularCliente: "11953254126", emailCliente: "victor@gmail.com", senha: "qwert123"
        }).then(() => {
            expect(inMemoryClientesRepository.items[0].nomeCliente).toBe("Victor");
            expect(inMemoryClientesRepository.items[0].cpfCliente).toBe("54689276080");
            expect(inMemoryClientesRepository.items[0].celularCliente).toBe("11953254126");
            expect(inMemoryClientesRepository.items[0].emailCliente).toBe("victor@gmail.com");
            expect(inMemoryClientesRepository.items[0].isAdmin).toBe(false);
            // Verifica se o hash salvo no banco está condizente com a encriptação
            expect(encriptarSenhaUC.execute({senha: "qwert123"}).then((result) => { return result.hash })).resolves.toBe(inMemoryClientesRepository.items[0].senha)
            // Verifica se o hash salvo no banco condiz com a decriptação
            expect(decriptarSenhaUC.execute({senha: "qwert123", hash: inMemoryClientesRepository.items[0].senha}).then((result) => { return result.result })).resolves.toBe(true);

        })).resolves;
    });

    test("Should not be able to create a client", () => {
        // Testando nomeCliente
        // Tentando cadastrar um cliente sem passar um nome
        expect(createClienteUCTest.execute({
            nomeCliente: "",
            cpfCliente: "546.892.760-80",
            celularCliente: "11456569856",
            emailCliente: "victor@gmail.com",
            senha: "qwert123"
        })).rejects.toThrow("É necessário inserir um nome")


    });

});