import { beforeAll, describe, expect, it, vi } from "vitest";
import { clientesRepositoryMocked } from "../../../repositories/implementations/index.test";
import { Cliente } from "../../../entities/Cliente";
import { Endereco } from "../../../entities/Endereco";
import { enderecoFactoryTest } from "../../../factories/index.test";
import { DelClienteUC } from "./DelClienteUC";

const findEnderecoByClienteUCTest = enderecoFactoryTest.useCases.findEnderecoByClienteUseCase();
const deleteEnderecoUCTest = enderecoFactoryTest.useCases.deleteEnderecoUseCase();

const delClienteUCTest = new DelClienteUC(clientesRepositoryMocked, findEnderecoByClienteUCTest, deleteEnderecoUCTest)

const clienteDTO: Cliente = {
    codigoCliente: "CAABBBCCCDDD",
    nomeCliente: "Teste Cliente",
    celularCliente: "11953162653",
    cpfCliente: "47555465465",
    emailCliente: "teste@teste.com",
    createdAt: new Date(Date.now())
}

const enderecos: Endereco[] = [
    {
        codigoEndereco: "EAABBBCCCDDD",
        codigoCliente: "CAABBBCCCDDD",
        nomeRua: "Rua",
        numeroCasa: "12",
        bairro: "Centro",
        cidade: "São Paulo",
        complemento: "",
        cep: "12232121",
        estado: "SP",
        nomeEndereco: "Casa"
    },
    {
        codigoEndereco: "EBBCCCDDDEEE",
        codigoCliente: "CBBCCCDDDEEE",
        nomeRua: "Rua 2",
        numeroCasa: "14",
        bairro: "Jardim 2",
        cidade: "São Paulo",
        complemento: "",
        cep: "12121121",
        estado: "SP",
        nomeEndereco: "Trabalho"
    }
]

describe("Testando a classe DelClienteUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível deletar um cliente", async () => {
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(clienteDTO);
        vi.spyOn(findEnderecoByClienteUCTest, 'execute').mockResolvedValue(null);

        const response = await delClienteUCTest.execute({ codigoCliente: "CAABBBCCCDDD" });

        expect(response).toEqual({
            message: "Cliente deletado com sucesso!"
        });

        expect(clientesRepositoryMocked.delete).toHaveBeenCalledWith(expect.any(String));
    });

    it("Deve lançar um erro para caso não insira nenhum código do cliente", () => {
        expect(delClienteUCTest.execute({
            codigoCliente: undefined
        })).rejects.toThrow("Código inválido")
    });

    it("Deve lançar um erro caso o cliente informado não exista", async () => {
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(null);

        expect(delClienteUCTest.execute({
            codigoCliente: "CAABBBCCCDDD"
        })).rejects.toThrow("Cliente não encontrado!");

        expect(clientesRepositoryMocked.getByCodigoCliente).toHaveBeenCalledWith(expect.any(String));
    });

    it("Deve apagar todos os endereços antes de apagar o cliente", async () => {
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(new Cliente({...clienteDTO}));
        vi.spyOn(findEnderecoByClienteUCTest, 'execute').mockResolvedValue(enderecos);
        vi.spyOn(deleteEnderecoUCTest, 'execute').mockResolvedValue({ message: "Endereço deletado com sucesso!" });

        const response = await delClienteUCTest.execute({
            codigoCliente: "CAABBBCCCDDD"
        });

        expect(response).toEqual({
            message: "Cliente deletado com sucesso!"
        });

        expect(deleteEnderecoUCTest.execute).toHaveBeenCalledTimes(2);

        expect(clientesRepositoryMocked.delete).toHaveBeenCalledWith(expect.any(String));
    });
});