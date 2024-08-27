import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { resetDatabase } from "../../utils"
import request from "supertest";
import prisma from "../../../src/repositories/implementations/prisma"
import { app } from "../../../src";

describe("Testando as rotas de categorias", () => {
    beforeEach(async () => {
        await resetDatabase(prisma);
    })
    describe("Testando a rota POST /categorias/", () => {
        it("Deve ser possível criar uma nova categoria", async () => {
            const categoriaJSON = {
                nomeCategoria: "Memoria"
            }

            const responseCreate = await request(app).post("/categorias/").send(categoriaJSON);
            expect(responseCreate.status).toBe(201);
            expect(responseCreate.body.codigoCategoria).toHaveLength(12);
            expect(responseCreate.body.message).toBe("Categoria cadastrada com sucesso!")
        });
    })
    describe("Testando a rota GET /categorias/", () => {
        beforeEach(async () => {
            // Criando algumas categorias no banco
            await request(app).post("/categorias/").send({ nomeCategoria: "Basico" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Top de Linha" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Intermediario" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Intermediario Premium" })
        })
        it("Deve ser possível buscar todas as categorias do banco", async () => {
            const responseGet = await request(app).get("/categorias/").send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(4);
            expect(responseGet.body.result[0].nomeCategoria).toBe("Basico");
            expect(responseGet.body.result[1].nomeCategoria).toBe("Top de Linha");
            expect(responseGet.body.result[2].nomeCategoria).toBe("Intermediario")
            expect(responseGet.body.result[3].nomeCategoria).toBe("Intermediario Premium")
        })
    })

    describe("Testando a rota GET /categorias/{filtro}", () => {
        beforeEach(async () => {
            // Criando algumas categorias no banco
            await request(app).post("/categorias/").send({ nomeCategoria: "Basico" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Top de Linha" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Intermediario" })
            await request(app).post("/categorias/").send({ nomeCategoria: "Intermediario Premium" })
        })
        it("Deve ser possível buscar todas as categorias com base em um filtro", async () => {
            const responseGet = await request(app).get("/categorias/Inter").send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(2);
            expect(responseGet.body.result[0].nomeCategoria).toBe("Intermediario")
            expect(responseGet.body.result[1].nomeCategoria).toBe("Intermediario Premium")
        })

        it("Deve ser possível buscar todas as categorias com base em um filtro (ignorando upper case)", async () => {
            const responseGet = await request(app).get("/categorias/inter").send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(2);
            expect(responseGet.body.result[0].nomeCategoria).toBe("Intermediario")
            expect(responseGet.body.result[1].nomeCategoria).toBe("Intermediario Premium")
        })

        it("Deve ser possível buscar todas as categorias caso nenhum filtro seja enviado", async () => {
            const responseGet = await request(app).get("/categorias/").send();
            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(4);
        })
    })

    describe("Testando a rota GET /categorias/busca/{codigo}", () => {
        it("Deve ser possível buscar uma categoria pelo código", async () => {
            // Criando uma categoria e pegando o código
            const responseCreate = await request(app).post("/categorias/").send({ nomeCategoria: "Memoria" });

            const responseGet = await request(app).get("/categorias/busca/" + responseCreate.body.codigoCategoria).send();
            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toEqual({
                codigoCategoria: responseCreate.body.codigoCategoria,
                nomeCategoria: "Memoria"
            });
        });
    })

    describe("Testando a rota PUT /categorias/{codigo}", () => {
        it("Deve ser possível alterar dados de uma categoria", async () => {
            // Criando uma categoria para pegar o código
            const responseCreate = await request(app).post("/categorias/").send({ nomeCategoria: "Memoria" });

            const responsePut = await request(app).put("/categorias/" + responseCreate.body.codigoCategoria).send({ nomeCategoria: "Camera" });
            expect(responsePut.status).toBe(200);
            expect(responsePut.body.message).toBe("Dados atualizados com sucesso!")

            const responseGet = await request(app).get("/categorias/busca/" + responseCreate.body.codigoCategoria).send();
            expect(responseGet.body.result.nomeCategoria).toBe("Camera");
        })
    })

    describe("Testando a rota DELETE /categorias/", () => {
        it("Deve ser possível deletar uma categoria", async () => {
            const responseCreate = await request(app).post("/categorias/").send({nomeCategoria: "Memoria"});
            
            const responseDelete = await request(app).delete("/categorias/" + responseCreate.body.codigoCategoria).send();
            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body.message).toBe("Categoria deletada com sucesso!")
            
            const responseSecondDelete = await request(app).delete("/categorias/" + responseCreate.body.codigoCategoria).send();
            expect(responseSecondDelete.status).toBe(404);
            expect(responseSecondDelete.body.error).toBe("Categoria não encontrada!")
        });

        it("Deve retornar 404 caso a categoria não exista", async () => {
            const responseDelete = await request(app).delete("/categorias/Taabbbcccddd").send();
            expect(responseDelete.status).toBe(404);
            expect(responseDelete.body.error).toBe("Categoria não encontrada!")
        })

        it("Deve apagar todos os ProdutoHasCategoria antes de apagar a categoria", async () => {
            
        })
    })
})