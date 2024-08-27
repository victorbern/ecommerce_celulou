import { beforeEach, describe, expect, it } from "vitest";
import { resetDatabase } from "../../utils";
import prisma from "../../../src/repositories/implementations/prisma";
import request from "supertest";
import { app } from "../../../src";
import { Produto } from "../../../src/entities/Produto";
import { ICreateProdutoRequestDTO } from "../../../src/useCases/produtos/CreateProduto/CreateProdutoDTO";
import e from "express";

describe("Testando as repositories de categorias", () => {
    beforeEach(async () => {
        await resetDatabase(prisma);
    });

    describe("Testando a função getByName", () => {
        it("Não deve ser possível cadastrar uma categoria caso o nome já tenha sido cadastrado", async () => {
            // Cadastrando uma categoria para testes
            await request(app).post("/categorias/").send({nomeCategoria: "Memoria"})
            
            const responsePost = await request(app).post("/categorias/").send({nomeCategoria: "Memoria"})

            expect(responsePost.status).toBe(409);
            expect(responsePost.body.error).toBe("Esta categoria já existe")
        });
    });

    describe("Testando a função save e a função getByCodigo", () => {
        it("Deve ser possível buscar uma categoria pelo código", async () => {
            // Cadastrando uma categoria no banco para testes
            const responsePost = await request(app).post("/categorias/").send({nomeCategoria: "Intermediario"});

            const responseGet = await request(app).get("/categorias/busca/" + responsePost.body.codigoCategoria).send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result.nomeCategoria).toBe("Intermediario")
        })
    })

    describe("Testando a função getByCodigoProduto", () => {
        it("Deve ser possível buscar todas as categorias de um produto", async () => {

        })
    })

    describe("Testando a função getAll e a função getAllWithFilter", async () => {
        beforeEach(async () => {
            await request(app).post("/categorias/").send({nomeCategoria: "Intermediario"});
            await request(app).post("/categorias/").send({nomeCategoria: "Memoria"});
            await request(app).post("/categorias/").send({nomeCategoria: "Camera"});
            await request(app).post("/categorias/").send({nomeCategoria: "Intermediario Premium"});
            await request(app).post("/categorias/").send({nomeCategoria: "Top de Linha"});
        })
        
        it("Deve ser possível buscar todas as categorias do banco", async () => {
            const responseGet = await request(app).get("/categorias/").send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(5);
            expect(responseGet.body.result[0].nomeCategoria).toBe("Intermediario");
            expect(responseGet.body.result[4].nomeCategoria).toBe("Top de Linha");
        });

        it("Deve ser possível buscar todas as categorias usando filtro", async () => {
            const responseGet = await request(app).get("/categorias/INTer").send();
            
            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(2);
            expect(responseGet.body.result[0].nomeCategoria).toBe("Intermediario")
            expect(responseGet.body.result[1].nomeCategoria).toBe("Intermediario Premium")
        });
    });

    describe("Testando a função update", async () => {
        it("Deve ser possivel atualizar os dados de uma categoria", async () => {
            // Salvando uma categoria no banco para testes
            const responsePost = await request(app).post("/categorias/").send({nomeCategoria: "Memoria"});
            
            const responseUpdate = await request(app).put("/categorias/" + responsePost.body.codigoCategoria).send({nomeCategoria: "Camera"});
            expect(responseUpdate.status).toBe(200);
            expect(responseUpdate.body.message).toBe("Dados atualizados com sucesso!");

            // Verificando se os dados foram deletados
            const responseGet = await request(app).get("/categorias/busca/" + responsePost.body.codigoCategoria).send();
            expect(responseGet.body.result.nomeCategoria).toBe("Camera");
        });
    });

    describe("Testando a função delete", async () => {
        it("Deve ser possível deletar uma categoria", async () => {
            // Cadastrando uma categoria para testes
            const responsePost = await request(app).post("/categorias/").send({nomeCategoria: "Camera"});
            expect(responsePost.status).toBe(201);

            const responseDelete = await request(app).delete("/categorias/" + responsePost.body.codigoCategoria).send();
            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body.message).toBe("Categoria deletada com sucesso!");
        });

        it("Não deve ser possível deletar uma categoria que não existe", async () => {
            const responseDelete = await request(app).delete("/categorias/Taabbbcccddd").send();
            expect(responseDelete.status).toBe(404);
            expect(responseDelete.body.error).toBe("Categoria não encontrada!")
        })
    })
});