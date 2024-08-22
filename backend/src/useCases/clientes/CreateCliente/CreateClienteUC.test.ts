import { beforeAll, describe, expect, it, vi } from "vitest";
import { cpf } from "cpf-cnpj-validator";
import { clientesRepositoryMocked } from "../../../repositories/implementations/index.mocks";
import { ICreateClienteRequestDTO } from "./CreateClienteDTO";
import { Cliente } from "../../../entities/Cliente";
import { clienteFactoryTest } from "../../../factories/index.mocks";

const createClienteUCTest = clienteFactoryTest.useCases.createClienteUseCase();

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

const createClienteDTO: ICreateClienteRequestDTO = {
    nomeCliente: "Teste Cliente",
    celularCliente: "11953162653",
    cpfCliente: "47555465465",
    emailCliente: "teste@teste.com"
}

describe("Testando a classe CreateClienteUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    })

    it("Deve cadastrar um cliente com sucesso", async () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);

        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(null);
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(null);
        clientesRepositoryMocked.getByEmailCliente.mockResolvedValue(null);

        const response = await createClienteUCTest.execute(createClienteDTO);

        expect(response).toEqual({
            message: "Cliente cadastrado com sucesso!",
            codigoCliente: "C12345678901"
        })

        expect(clientesRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Cliente))

    })

    it("Deve lançar um erro se o cpf não for fornecido", () => {
        expect(createClienteUCTest.execute({
            ...createClienteDTO,
            cpfCliente: undefined
        })).rejects.toThrow("É necessário inserir um cpf!");
    });

    it("Não deve ser possível criar um cliente com cpf inválido", () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(false);

        expect(createClienteUCTest.execute({
            ...createClienteDTO
        })).rejects.toThrow("O CPF é inválido")
    })

    it("Não deve ser possível criar um cliente caso um dos dados esteja incorreto (testando zod)", () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);

        expect(createClienteUCTest.execute({
            ...createClienteDTO,
            nomeCliente: null
        })).rejects.toThrow("O nome precisa ser uma string")
    })

    it("Não deve ser possível criar um cliente caso já tenha um cliente cadastrado com o cpf", () => {
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(new Cliente(
            {
                ...createClienteDTO,
                codigoCliente: "CAABBBCCCDDD",
                createdAt: new Date(Date.now())
            }
        ));
        
        expect(createClienteUCTest.execute({
            ...createClienteDTO,
        })).rejects.toThrow("O CPF já está cadastrado")
    })

    it("Não deve ser possível criar um cliente caso já tenha o email cadastrado", () => {
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(null);
        clientesRepositoryMocked.getByEmailCliente.mockResolvedValue(new Cliente(
            {
                ...createClienteDTO,
                codigoCliente: "CAABBBCCCDDD",
                createdAt: new Date(Date.now())
            }
        ))

        expect(createClienteUCTest.execute({
            ...createClienteDTO,
        })).rejects.toThrow("O e-mail já está cadastrado")
    });

})