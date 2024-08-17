import { beforeAll, describe, expect, it, vi } from "vitest";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/index.test";
import { Endereco } from "../../../entities/Endereco";
import { enderecoFactoryTest } from "../../../factories/index.test";

const deleteEnderecoUCTest = enderecoFactoryTest.useCases.deleteEnderecoUseCase();

const enderecoDTO: Endereco = {
    codigoEndereco: "EAABBBCCCDDD",
    nomeEndereco: "Casa",
    nomeRua: "Rua 1",
    numeroCasa: "40",
    bairro: "Centro",
    cidade: "Piracaia",
    estado: "SP",
    cep: "12970000",
    complemento: "",
    codigoCliente: "CAABBBCCCDDD"
}

describe("Testando a classe DeleteEnderecoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível deletar um endereço", async () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(enderecoDTO);

        const response = await deleteEnderecoUCTest.execute({
            codigoEndereco: "EAABBBCCCDDD"
        });

        expect(response).toEqual({
            message: "Endereço deletado com sucesso!"
        });

        expect(enderecosRepositoryMocked.delete).toHaveBeenCalledWith(expect.any(String));

    });

    it("Não deve ser possível deletar um endereço caso não seja enviado nenhum código", () => {
        expect(deleteEnderecoUCTest.execute({
            codigoEndereco: undefined
        })).rejects.toThrow("Código inválido");
    })

    it("Não deve ser possível deletar um endereço que não exista", () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(null);

        expect(deleteEnderecoUCTest.execute({
            codigoEndereco: "EAABBBCCCDDD"
        })).rejects.toThrow("Endereço não encontrado!");
    });
});