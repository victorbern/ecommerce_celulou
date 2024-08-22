import { beforeAll, describe, expect, it, vi } from "vitest";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/index.mocks";
import { Endereco } from "../../../entities/Endereco";
import { enderecoFactoryTest } from "../../../factories/index.mocks";

const updateEnderecoUCTest = enderecoFactoryTest.useCases.updateEnderecoUseCase();

const enderecoAntigoDTO: Endereco = {
    codigoEndereco: "E12345678901",
    nomeRua: "Rua 1",
    numeroCasa: "40",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "12212121",
    codigoCliente: "CAABBBCCCDDD",
    complemento: "",
    nomeEndereco: "Casa"
}

const enderecoNovoDTO: Endereco = {
    codigoEndereco: "EAABBBCCCDDD",
    nomeRua: "Rua 2",
    numeroCasa: "50",
    bairro: "Parque dos Pinheiros",
    cidade: "Piracaia",
    estado: "SP",
    cep: "12970000",
    codigoCliente: "CAABBBCCCDDD",
    complemento: "",
    nomeEndereco: "Trabalho"
}

const enderecoDTO: Endereco = {
    codigoEndereco: "EBBCCCDDDEEE",
    nomeRua: "Rua 3",
    numeroCasa: "60",
    bairro: "PArque das Olivas",
    cidade: "São Carlos",
    estado: "SP",
    cep: "12656565",
    codigoCliente: "CAABBBCCCDDD",
    complemento: "",
    nomeEndereco: "Trabalho"
}

describe("Testando a classe UpdateEnderecoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possivel atualizar os dados de um endereço", async () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(enderecoAntigoDTO);

        const response = await updateEnderecoUCTest.execute({
            ...enderecoNovoDTO,
            nomeEndereco: enderecoAntigoDTO.nomeEndereco
        });

        expect(response).toEqual({
            message: "Dados atualizados com sucesso!"
        });

        expect(enderecosRepositoryMocked.update).toHaveBeenCalledWith(expect.any(Endereco))
    });

    it("Não deve ser possível atualizar os dados de um endereço porque o código fornecido é inválido", () => {
        expect(updateEnderecoUCTest.execute({
            ...enderecoNovoDTO,
            codigoEndereco: undefined
        })).rejects.toThrow("Código inválido!");
    });

    it("Não deve ser possível atualizar os dados de um endereço porque o endereço não existe", () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(null);
        expect(updateEnderecoUCTest.execute({
            ...enderecoNovoDTO
        })).rejects.toThrow("Endereço não encontrado!");
    });

    it("Não deve ser possível atualizar os dados de um endereço caso o novo nome do endereço já esteja em uso pelo cliente", () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(enderecoAntigoDTO);
        enderecosRepositoryMocked.getByCodigoCliente.mockResolvedValue([
            { ...enderecoAntigoDTO }, { ...enderecoDTO }
        ]);

        expect(updateEnderecoUCTest.execute({
            ...enderecoNovoDTO,
            nomeEndereco: enderecoDTO.nomeEndereco
        })).rejects.toThrow("Não é possível alterar o nome do endereço para um nome em uso por outro endereço");
    });

    it("Não deve ser possível atualizar os dados de um endereço porque um dos dados é inválido (testando o zod)", () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(enderecoAntigoDTO);
        expect(updateEnderecoUCTest.execute({
            ...enderecoNovoDTO,
            nomeEndereco: enderecoAntigoDTO.nomeEndereco,
            nomeRua: undefined,
        })).rejects.toThrow("É necessário inserir uma rua");
    });
})