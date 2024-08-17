import { beforeAll, describe, expect, it, vi } from "vitest";
import { Endereco } from "../../../entities/Endereco";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/index.test";
import { enderecoFactoryTest } from "../../../factories/index.test";

const findEnderecoUCTest = enderecoFactoryTest.useCases.findEnderecoUseCase();

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

describe("Testando a classe FindEnderecoUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });
    
    it("Deve ser possível buscar um endereço específico pelo código", async () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(enderecoDTO);

        const response = await findEnderecoUCTest.execute({
            codigoEndereco: "EAABBBCCCDDD"
        });

        expect(response).toEqual({
            ...enderecoDTO
        });

        expect(enderecosRepositoryMocked.getByCodigoEndereco).toHaveBeenCalledWith(expect.any(String))
    });

    it("Não deve ser possível buscar um endereço pelo código se o código for inválido", () => {
        expect(findEnderecoUCTest.execute({
            codigoEndereco: undefined
        })).rejects.toThrow("Código inválido");
    });

    it("Não deve ser possível buscar um endereço que não existe", async () => {
        enderecosRepositoryMocked.getByCodigoEndereco.mockResolvedValue(null);

        const response = await findEnderecoUCTest.execute({
            codigoEndereco: "EAABBBCCCDDD"
        });

        expect(response).toBeNull();
    });
});