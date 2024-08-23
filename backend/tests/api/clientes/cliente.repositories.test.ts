import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { resetDatabase } from "../../utils"
import prisma from "../../../src/repositories/implementations/prisma"
import { execSync } from "child_process";
import request from "supertest";
import { app } from "../../../src";

beforeAll(async () => {
    await execSync("npx prisma migrate reset --force")
})

afterAll(async () => {
    await resetDatabase(prisma)
})

describe("Testando as repositories de cliente", () => {
    beforeEach(async () => {
        await resetDatabase(prisma);
    })
    describe("Testando a função getByCpfCliente", () => {
        it("Não deve ser possível criar um cpf caso ele já esteja cadastrado", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const clienteNovoJSON = {
                cpfCliente: "48687865040",
                nomeCliente: "Cliente Teste 2",
                celularCliente: "11955554444",
                emailCliente: "teste2@teste.com",
            }

            const responseCreate = await request(app).post("/clientes").send(clienteJSON)
            expect(responseCreate.status).toBe(201);

            const responseCreate2 = await request(app).post("/clientes").send(clienteNovoJSON)
            expect(responseCreate2.status).toBe(409)
            expect(responseCreate2.body.error).toBe("O CPF já está cadastrado")
        });
    });

    describe("Testando a função getByEmailCliente", () => {
        it("Não deve ser possível criar um email caso ele já esteja cadastrado", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const clienteNovoJSON = {
                cpfCliente: "188.069.690-80",
                nomeCliente: "Cliente Teste 2",
                celularCliente: "11955554444",
                emailCliente: "teste@teste.com",
            }

            const responseCreate = await request(app).post("/clientes").send(clienteJSON)
            expect(responseCreate.status).toBe(201);

            const responseCreate2 = await request(app).post("/clientes").send(clienteNovoJSON)
            expect(responseCreate2.status).toBe(409)
            expect(responseCreate2.body.error).toBe("O e-mail já está cadastrado")
        });
    });

    describe("Testando a função save, a função getByCodigoCliente e a função update", () => {
        it("Deve ser possível buscar um cliente com base em seu código", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const clienteNovoJSON = {
                cpfCliente: "188.069.690-80",
                nomeCliente: "Cliente Teste 2",
                celularCliente: "11955554444",
                emailCliente: "teste2@teste.com",
            }

            const responseCreate = await request(app).post("/clientes").send(clienteJSON);
            expect(responseCreate.status).toBe(201);

            const responsePut = await request(app).put("/clientes/" + responseCreate.body.codigoCliente).send(clienteNovoJSON);
            expect(responsePut.status).toBe(200);
            expect(responsePut.body.message).toBe("Dados atualizados com sucesso!");

            const responseGet = await request(app).get("/clientes/" + responseCreate.body.codigoCliente).send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result.codigoCliente).toBe(responseCreate.body.codigoCliente);
            expect(responseGet.body.result.cpfCliente).toBe("18806969080");
            expect(responseGet.body.result.nomeCliente).toBe("Cliente Teste 2");
            expect(responseGet.body.result.celularCliente).toBe("11955554444");
            expect(responseGet.body.result.emailCliente).toBe("teste2@teste.com");
        });
    });

    describe("Testando a função delete", () => {
        it("Deve ser possível deletar um cliente", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const responseCreate = await request(app).post("/clientes").send(clienteJSON);
            expect(responseCreate.status).toBe(201);

            const responseDelete = await request(app).delete("/clientes/" + responseCreate.body.codigoCliente).send();
            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body.message).toBe("Cliente deletado com sucesso!")

            const responseGet = await request(app).get("/clientes/" + responseCreate.body.codigoCliente).send();
            expect(responseGet.status).toBe(404);
        });
    })
});