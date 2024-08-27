import { beforeEach, describe, expect, it } from "vitest";
import { resetDatabase } from "../../utils";
import prisma from "../../../src/repositories/implementations/prisma";
import request from "supertest";
import { app } from "../../../src";

describe("Testando todas as rotas de endereço", () => {
    beforeEach(async () => {
        await resetDatabase(prisma);
    })

    describe("Testando a rota POST - /clientes/{codigo}/enderecos/", () => {
        it("Deve ser possível cadastrar 3 endereços para um cliente - testando a função save", async () => {
            // Criando um cliente para testes
            const clienteJson = {
                nomeCliente: "Cliente Teste",
                cpfCliente: "486.878.650-40",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseClientePost = await request(app).post("/clientes/").send(clienteJson);

            // Criando endereços para serem cadastrados
            const endereco1 = {
                nomeEndereco: "Casa",
                nomeRua: "Rua 1",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }
            const endereco2 = {
                nomeEndereco: "Trabalho",
                nomeRua: "Rua 2",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }
            const endereco3 = {
                nomeEndereco: "Escola",
                nomeRua: "Rua 4",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "10"
            }

            let responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco1);
            expect(responsePost.status).toBe(201);

            responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco2);
            expect(responsePost.status).toBe(201);

            responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco3);
            expect(responsePost.status).toBe(201);

            expect(prisma.endereco.findMany({
                where: {
                    codigoCliente: responseClientePost.body.codigoCliente,
                }
            })).resolves.toHaveLength(3);
        });
    });

    describe("Testando a rota GET - /clientes/{codigo}/enderecos/", () => {
        it("Deve ser possível buscar todos os endereços de um cliente - testando a função getByCodigoCliente", async () => {
            // Criando um cliente para testes
            const clienteJson = {
                nomeCliente: "Cliente Teste",
                cpfCliente: "486.878.650-40",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseClientePost = await request(app).post("/clientes/").send(clienteJson);

            // Criando endereços para serem cadastrados
            const endereco1 = {
                nomeEndereco: "Casa",
                nomeRua: "Rua 1",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }
            const endereco2 = {
                nomeEndereco: "Trabalho",
                nomeRua: "Rua 2",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }
            const endereco3 = {
                nomeEndereco: "Escola",
                nomeRua: "Rua 4",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "10"
            }

            let responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco1);
            expect(responsePost.status).toBe(201);

            responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco2);
            expect(responsePost.status).toBe(201);

            responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco3);
            expect(responsePost.status).toBe(201);

            const responseGet = await request(app).get("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toHaveLength(3);
            expect(responseGet.body.result[0].nomeEndereco).toBe("Casa");
            expect(responseGet.body.result[1].nomeEndereco).toBe("Trabalho");
            expect(responseGet.body.result[2].nomeEndereco).toBe("Escola");
        })
    });

    describe("Testando a rota GET - /enderecos/{codigo}", () => {
        it("Deve ser possível buscar um endereço pelo código - testando a função getByCodigoEndereco", async () => {
            // Criando um cliente para testes
            const clienteJson = {
                nomeCliente: "Cliente Teste",
                cpfCliente: "486.878.650-40",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseClientePost = await request(app).post("/clientes/").send(clienteJson);

            // Criando um endereço para testes
            const endereco = {
                nomeEndereco: "Casa",
                nomeRua: "Rua 1",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }

            const responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco);

            const responseGet = await request(app).get("/enderecos/" + responsePost.body.codigoEndereco).send();

            expect(responseGet.status).toBe(200);
            expect(responseGet.body.result).toEqual(
                expect.objectContaining({
                    nomeEndereco: "Casa",
                    nomeRua: "Rua 1",
                    bairro: "Centro",
                    cidade: "São Paulo",
                    estado: "SP",
                    cep: "12312233",
                    complemento: "",
                    numeroCasa: "22"
                })
            )
        });
    });

    describe("Testando a rota PUT - /enderecos/{codigo}", () => {
        it("Deve ser possível atualizar os dados de um endereço - testando a função update", async () => {
            // Criando um cliente para testes
            const clienteJson = {
                nomeCliente: "Cliente Teste",
                cpfCliente: "486.878.650-40",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseClientePost = await request(app).post("/clientes/").send(clienteJson);

            // Criando um endereço para testes
            const endereco = {
                nomeEndereco: "Casa",
                nomeRua: "Rua 1",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }

            const responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco);

            const enderecoNovo = {
                nomeEndereco: "Trabalho",
                nomeRua: "Rua 2",
                bairro: "Jd. Pinheiros",
                cidade: "São Gonçalo",
                estado: "RJ",
                cep: "15616265",
                complemento: "",
                numeroCasa: "32"
            }

            const responsePut = await request(app).put("/enderecos/" + responsePost.body.codigoEndereco).send(enderecoNovo);
            expect(responsePut.status).toBe(200);
            expect(responsePut.body.message).toBe("Dados atualizados com sucesso!")

            const responseGet = await request(app).get("/enderecos/" + responsePost.body.codigoEndereco).send();
            expect(responseGet.body.result).toEqual(
                expect.objectContaining({
                    nomeEndereco: "Trabalho",
                    nomeRua: "Rua 2",
                    bairro: "Jd. Pinheiros",
                    cidade: "São Gonçalo",
                    estado: "RJ",
                    cep: "15616265",
                    complemento: "",
                    numeroCasa: "32"
                })
            );
        });
    });

    describe("Testando a rota DELETE - /enderecos/{codigo}", () => {
        it("Deve ser possível deletar um endereço - testando a função delete", async () => {
            // Criando um cliente para testes
            const clienteJson = {
                nomeCliente: "Cliente Teste",
                cpfCliente: "486.878.650-40",
                celularCliente: "11956565656",
                emailCliente: "teste@teste.com",
            }
            const responseClientePost = await request(app).post("/clientes/").send(clienteJson);

            // Criando um endereço para testes
            const endereco = {
                nomeEndereco: "Casa",
                nomeRua: "Rua 1",
                bairro: "Centro",
                cidade: "São Paulo",
                estado: "SP",
                cep: "12312-233",
                complemento: "",
                numeroCasa: "22"
            }

            const responsePost = await request(app).post("/clientes/" + responseClientePost.body.codigoCliente + "/enderecos/").send(endereco);

            const responseDelete = await request(app).delete("/enderecos/" + responsePost.body.codigoEndereco).send();
            expect(responseDelete.status).toBe(200);
            expect(responseDelete.body.message).toBe("Endereço deletado com sucesso!");
        })
    })
});