import { beforeAll, describe, expect, it, vi } from "vitest";
import { Cliente } from "../../../entities/Cliente";
import { clientesRepositoryMocked } from "../../../repositories/implementations/index.test";
import { clienteFactoryTest } from "../../../factories/index.test";
const date = new Date(Date.now())

const findClienteUCTest = clienteFactoryTest.useCases.findClienteUseCase();

const clienteDTO: Cliente = {
    codigoCliente: "CAABBBCCCDDD",
    nomeCliente: "Teste Cliente",
    celularCliente: "11956352563",
    cpfCliente: "47575185965",
    createdAt: date,
    emailCliente: "teste@teste.com"
}

describe("Testando a classe FindClienteUC", () => {
    beforeAll(() => {
        vi.clearAllMocks();
    });

    it("Deve ser possível buscar um cliente no banco", async () => {
        clientesRepositoryMocked.getByCodigoCliente.mockResolvedValue(new Cliente({...clienteDTO}));

        const response = await findClienteUCTest.execute({
            codigoCliente: "CAABBBCCCDDD"
        });

        expect(response).toEqual({
            ...clienteDTO
        });

        expect(clientesRepositoryMocked.getByCodigoCliente).toHaveBeenCalledWith(expect.any(String));
    });

    it("Não deve ser possível buscar um cliente caso não envie nenhum dado", () => {
        expect(findClienteUCTest.execute({
            codigoCliente: undefined
        })).rejects.toThrow("Código inválido");
    });
})