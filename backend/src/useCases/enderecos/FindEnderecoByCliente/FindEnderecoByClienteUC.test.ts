import { beforeAll, describe, expect, it, vi } from "vitest";
import { Cliente } from "../../../entities/Cliente";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/index.test";
import { Endereco } from "../../../entities/Endereco";
import { enderecoFactoryTest } from "../../../factories/index.test";

const findEnderecoByClienteUCTest = enderecoFactoryTest.useCases.findEnderecoByClienteUseCase();

const clienteDTO: Cliente = {
    nomeCliente: "Teste Cliente",
    celularCliente: "11953162653",
    cpfCliente: "47555465465",
    emailCliente: "teste@teste.com",
    codigoCliente: "CAABBBCCCDDD",
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

describe("Testando a classe FindEnderecoByClienteUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar todos os endereços de um cliente", async () => {
        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue(enderecos);

        const response = await findEnderecoByClienteUCTest.execute({
            codigoCliente: "CAABBBCCCDDD"
        });

        expect(response).toEqual(enderecos);

        expect(enderecosRepositoryMocked.getByCodigoCliente).toHaveBeenCalledWith(expect.any(String));
    });

    it("Não deve ser possível buscar os endereços de um cliente se o código do cliente for inválido", () => {
        expect(findEnderecoByClienteUCTest.execute({
            codigoCliente: undefined
        })).rejects.toThrow("Código do cliente inválido");
    });

    it("Não deve ser possível buscar os endereços de um cliente caso o cliente não possua nenhum endereço cadastrado", async () => {
        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue(null);

        const response = await findEnderecoByClienteUCTest.execute({
            codigoCliente: "CAABBBCCCDDD"
        });

        expect(response).toBeNull();
    })
})