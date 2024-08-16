import { beforeAll, describe, expect, it, vi } from "vitest";
import { Cliente } from "../../../entities/Cliente";
import { cpf } from "cpf-cnpj-validator";
import { clientesRepositoryMocked } from "../../../repositories/implementations/index.test";
import { clienteFactoryTest } from "../../../factories/index.test";

const updateClienteUCTest = clienteFactoryTest.useCases.updateClienteUseCase();

const clienteAntigoDTO: Cliente = {
    codigoCliente: "CAABBBCCCDDD",
    nomeCliente: "Teste Cliente",
    celularCliente: "11953162653",
    cpfCliente: "11122233345",
    emailCliente: "teste@teste.com",
    createdAt: new Date(Date.now()),
}

const clienteNovoDTO: Cliente = {
    codigoCliente: "CAABBBCCCDDD",
    nomeCliente: "Teste 2",
    celularCliente: "11965656565",
    cpfCliente: "47555465465",
    emailCliente: "teste2@teste.com",
    createdAt: new Date(Date.now()),
}

describe("Testando a classe UpdateClienteUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível atualizar os dados de um cliente", async () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);

        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(new Cliente({...clienteNovoDTO}));
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(null);
        clientesRepositoryMocked.getByEmailCliente.mockResolvedValue(null);

        const response = await updateClienteUCTest.execute({
            ...clienteNovoDTO
        });

        expect(response).toEqual({
            message: "Dados atualizados com sucesso!"
        });

        expect(clientesRepositoryMocked.update).toHaveBeenCalledWith(expect.any(Cliente));
    });

    it("Não deve ser possível atualizar os dados de um cliente caso não envie nenhum código", () => {
        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO,
            codigoCliente: undefined
        })).rejects.toThrow("Código inválido!")
    })

    it("Não deve ser possível atualizar os dados de um cliente caso o cpf seja inválido", () => {
        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO,
            cpfCliente: undefined
        })).rejects.toThrow("É necessário inserir um cpf!");

        vi.spyOn(cpf, 'isValid').mockReturnValue(false);

        
        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO
        })).rejects.toThrow("O CPF é inválido")
    });

    it("Não deve ser possível atualizar os dados de um cliente caso o cliente não exista", () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(null);

        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO
        })).rejects.toThrow("Cliente não encontrado");
    });

    it("Não deve ser possível atualizar os dados de um cliente para um cpf em uso por outro cliente", () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(new Cliente({...clienteAntigoDTO}));
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(new Cliente({
            ...clienteAntigoDTO,
            codigoCliente: "CBBDDDEEEFFF"
        }));

        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO,

        })).rejects.toThrow("O novo cpf informado já está cadastrado");
    });

    it("Não deve ser possível atualizar os dados de um cliente para um email em uso por outro cliente", () => {
        vi.spyOn(cpf, 'isValid').mockReturnValue(true);
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(new Cliente({...clienteAntigoDTO}));
        clientesRepositoryMocked.getByCpfCliente.mockResolvedValue(null);
        clientesRepositoryMocked.getByEmailCliente.mockResolvedValue(new Cliente({
            ...clienteAntigoDTO,
            codigoCliente: "CBBDDDEEEFFF"
        }));

        expect(updateClienteUCTest.execute({
            ...clienteNovoDTO,

        })).rejects.toThrow("O novo e-mail informado já está cadastrado");
    });
});