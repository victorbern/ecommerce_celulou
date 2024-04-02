import { describe, expect, test } from 'vitest'
import { inMemoryClientesRepository } from '../../../repositories/in-memory';
import { createClienteUCTest } from '.';
import { decriptarSenhaUC } from '../../autenticacao/DecriptarSenha';


describe("Testando a classe CreateClienteUC", () => {
    inMemoryClientesRepository.items = [];

    // Populando a base para testes
    inMemoryClientesRepository.items.push({
        "codigoCliente": "CSHAJSKDLSPA",
        "nomeCliente": "Victor",
        "cpfCliente": "83815066034",
        "celularCliente": "11964758393",
        "emailCliente": "victor@gmail.com",
        "senha": "wqijwjiwjiw",
        "createdAt": new Date(Date.now()),
        "isAdmin": false
    })

    test("Should be able to create a client", () => {
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "546.892.760-80", celularCliente: "11953254126", emailCliente: "teste@gmail.com", senha: "qwert123"
        }).then(() => {
            expect(inMemoryClientesRepository.items[1].nomeCliente).toBe("Victor");
            expect(inMemoryClientesRepository.items[1].cpfCliente).toBe("54689276080");
            expect(inMemoryClientesRepository.items[1].celularCliente).toBe("11953254126");
            expect(inMemoryClientesRepository.items[1].emailCliente).toBe("teste@gmail.com");
            expect(inMemoryClientesRepository.items[1].isAdmin).toBe(false);
            // Verifica se o hash salvo no banco está condizente com a encriptação
            let hashSalvo = inMemoryClientesRepository.items[1].senha;
            expect(decriptarSenhaUC.execute({ senhaInput: "qwert123", hash: hashSalvo })).resolves.toBe(true);

        })).resolves;
    });

    test("Should not be able to create a client", () => {
        // Tentando cadastrar um cliente com um cpf inválido
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "111.111.111-11", celularCliente: "11953254126", emailCliente: "email@gmail.com", senha: "qwert123"
        })).rejects.toThrow("O CPF é Inválido");

        // Tentando cadastrar um cliente com uma senha com menos de 8 digitos
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "546.892.760-80", celularCliente: "11953254126", emailCliente: "email@gmail.com", senha: "qwert12"
        })).rejects.toThrow("A senha deve conter pelo menos 8 caracteres");

        // Tentando cadastrar um cliente com um cpf já cadastrado
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "838.150.660-34", celularCliente: "11953254126", emailCliente: "email@gmail.com", senha: "qwert123"
        })).rejects.toThrow("O CPF já está cadastrado");

        // Tentando cadastrar um cliente com um email já cadastrado
        expect(createClienteUCTest.execute({
            nomeCliente: "Victor", cpfCliente: "698.315.110-00", celularCliente: "11953254126", emailCliente: "victor@gmail.com", senha: "qwert123"
        })).rejects.toThrow("O e-mail já está cadastrado");
    });

});
