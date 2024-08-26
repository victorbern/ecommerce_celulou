import { describe, expect, it, beforeEach } from "vitest";
import { app } from "../../../src/index";
import request from "supertest";
import prisma from "../../../src/repositories/implementations/prisma";
import { resetDatabase } from "../../utils";

describe("Testando todas as rotas de cliente", () => {
    beforeEach(async () => {
        await resetDatabase(prisma);
    })
    describe("Testando a rota POST /clientes/", () => {
        it("Deve ser possível criar um novo cliente", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const responseCreate = await request(app).post("/clientes").send(clienteJSON)
            expect(responseCreate.status).toBe(201);
            expect(responseCreate.body.message).toBe("Cliente cadastrado com sucesso!")
            expect(responseCreate.body.codigoCliente).toHaveLength(12)
        });
    });

    describe("Testando a rota GET /clientes/{codigo}", () => {
        it("Deve ser possível buscar um cliente recém cadastrado", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseCreate = await request(app).post("/clientes").send(clienteJSON);
            const responseGET = await request(app).get("/clientes/" + responseCreate.body.codigoCliente).send();
            expect(responseGET.status).toBe(200);
            expect(responseGET.body).toHaveProperty("result");
            expect(responseGET.body.result.cpfCliente).toBe("48687865040");
            expect(responseGET.body.result.nomeCliente).toBe("Cliente Teste");
            expect(responseGET.body.result.celularCliente).toBe("11956565656");
            expect(responseGET.body.result.emailCliente).toBe("teste@teste.com");
        })
    })

    describe("Testando a rota PUT /clientes/{codigo}", () => {
        it("Deve ser possível alterar dados de um cliente", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }

            const clienteNovoJSON = {
                cpfCliente: "470.113.770-77",
                nomeCliente: "Cliente Teste 2",
                celularCliente: "11966665555",
                emailCliente: "teste2@teste.com",
            }
            const responseCreate = await request(app).post("/clientes").send(clienteJSON)
            const responsePut = await request(app).put('/clientes/' + responseCreate.body.codigoCliente).send(clienteNovoJSON);
            const responseGet = await request(app).get("/clientes/" + responseCreate.body.codigoCliente).send()

            expect(responsePut.status).toBe(200);
            expect(responsePut.body.message).toBe("Dados atualizados com sucesso!")
            expect(responseGet.body.result.cpfCliente).toBe("47011377077");
            expect(responseGet.body.result.nomeCliente).toBe("Cliente Teste 2");
            expect(responseGet.body.result.celularCliente).toBe("11966665555");
            expect(responseGet.body.result.emailCliente).toBe("teste2@teste.com");
        })
    })

    describe("Testando a rota DELETE /clientes/{codigo}", () => {
        it("Deve ser possível deletar um cliente", async () => {
            const clienteJSON = {
                cpfCliente: "486.878.650-40",
                nomeCliente: "Cliente Teste",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseCreate = await request(app).post("/clientes").send(clienteJSON);

            const responseDelete = await request(app).delete("/clientes/" + responseCreate.body.codigoCliente).send();

            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body.message).toBe("Cliente deletado com sucesso!")

            const responseGet = await request(app).get("/clientes/" + responseCreate.body.codigoCliente).send();

            expect(responseGet.status).toBe(404);
            expect(responseGet.body.error).toBe("Cliente não encontrado");
        })
    })
});