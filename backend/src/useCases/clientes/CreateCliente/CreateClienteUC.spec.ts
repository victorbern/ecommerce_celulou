import {describe, expect, test} from '@jest/globals'
import { inMemoryClientesRepository } from '../../../repositories/in-memory';
import { createClienteUC } from '.';

describe("Testando a classe CreateClienteUC", () => {
    inMemoryClientesRepository.items = [];

    test("Creating a client", () => {
        expect(createClienteUC.execute({
            nomeCliente: "Victor", cpfCliente: "475.751.848-22", celularCliente: "11953254126", emailCliente: "victor@gmail.com", senha: "qwert123"
        }).then(() => {
            expect(inMemoryClientesRepository.items[0].nomeCliente).toBe("Victor");
            expect(inMemoryClientesRepository.items[0].cpfCliente).toBe("47575178821");
            expect(inMemoryClientesRepository.items[0].celularCliente).toBe("11953254126");
            expect(inMemoryClientesRepository.items[0].emailCliente).toBe("victor@gmail.com");
            expect(inMemoryClientesRepository.items[0].isAdmin).toBe(false);
            // expect(inMemoryClientesRepository.items[0].senha).toBe()

        }));
    })
});