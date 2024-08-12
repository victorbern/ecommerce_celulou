import { beforeAll, describe, expect, it, vi } from "vitest";
import { findClienteUCTest } from "../../clientes/FindCliente";
import { Cliente } from "../../../entities/Cliente";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { Endereco } from "../../../entities/Endereco";
import { createEnderecoUCTest } from ".";

vi.mock('uniqid', () => {
    return {
        __esModule: true,
        default: vi.fn(() => '12345678901')
    };
});

const clienteDTO: Cliente = {
    codigoCliente: "CAABBBCCCDDD",
    nomeCliente: "Teste Cliente",
    celularCliente: "11956565656",
    cpfCliente: "45865985656",
    createdAt: new Date(Date.now()),
    emailCliente: "teste@teste.com"
}

const enderecoDTO: Endereco = {
    codigoEndereco: "E12345678901",
    nomeRua: "Rua 1",
    numeroCasa: "40",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "12212-121",
    codigoCliente: "CAABBBCCCDDD",
    complemento: "",
    nomeEndereco: "Casa"
}

const enderecosDTO: Endereco[] = [
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
        nomeEndereco: "Casa 2"
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
    },
    {
        codigoEndereco: "ECCDDDEEEFFF",
        codigoCliente: "CBBCCCDDDEEE",
        nomeRua: "Rua 3",
        numeroCasa: "40",
        bairro: "Parque das Olivas",
        cidade: "São Paulo",
        complemento: "",
        cep: "12656365",
        estado: "SP",
        nomeEndereco: "Faculdade"
    }
]

describe("Testando a classe CreateEnderecoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks()
    });

    it("Deve ser possível cadastrar um novo endereço", async () => {
        vi.spyOn(findClienteUCTest, 'execute').mockResolvedValue(new Cliente({ ...clienteDTO }));
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(null);

        const response = await createEnderecoUCTest.execute({
            ...enderecoDTO
        });

        expect(response).toEqual({
            message: "Endereço cadastrado com sucesso!",
            codigoEndereco: "E12345678901"
        });

        expect(enderecosRepositoryMocked.save).toHaveBeenCalledWith(expect.any(Endereco))
    });

    it("Não deve ser possível cadastrar um novo endereço caso o cliente não seja especificado corretamente", () => {
        expect(createEnderecoUCTest.execute({
            ...enderecoDTO,
            codigoCliente: undefined
        })).rejects.toThrow("É necessário inserir um código do cliente para o endereço");

        vi.spyOn(findClienteUCTest, 'execute').mockResolvedValue(null);

        expect(createEnderecoUCTest.execute({
            ...enderecoDTO
        })).rejects.toThrow("Cliente não encontrado!");
    });

    it("Não deve ser possível criar um endereço caso o cliente já esteja no limite de 3 endereços", () => {
        vi.spyOn(findClienteUCTest, 'execute').mockResolvedValue(new Cliente(clienteDTO));
        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue(enderecosDTO);

        expect(createEnderecoUCTest.execute({
            ...enderecoDTO
        })).rejects.toThrow("Cada cliente só pode ter até 3 endereços cadastrados");
    });

    it("Não deve ser possível criar um endereço caso o cliente já possua um endereço com o nome especificado", () => {
        vi.spyOn(findClienteUCTest, 'execute').mockResolvedValue(new Cliente(clienteDTO));

        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue([
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
            }
        ]);

        expect(createEnderecoUCTest.execute({
            ...enderecoDTO
        })).rejects.toThrow("O nome do endereço já está cadastrado")
    });

    it("Não deve ser possível criar um endereço caso um dos dados de endereço seja inválido (testando se o zod está funcionando", () => {
        vi.spyOn(findClienteUCTest, 'execute').mockResolvedValue(new Cliente(clienteDTO));
        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue(null);

        expect(createEnderecoUCTest.execute({
            ...enderecoDTO,
            nomeRua: null
        })).rejects.toThrow("O nome da rua precisa ser uma string");
    })
})