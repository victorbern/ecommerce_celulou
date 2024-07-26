import { afterAll, beforeAll, describe, expect, it, test, afterEach, beforeEach  } from "vitest";
import {app} from "../../src/index";
import request from "supertest";
import prisma from "../../src/repositories/implementations/prisma";
import { execSync } from "child_process";
import { resetDatabase } from "../utils";



beforeAll(async () => {
    execSync("npx prisma migrate reset --force")
})

afterAll(async () => {
    await resetDatabase(prisma)
})


describe("POST /clientes", () => {
    beforeEach(async () => {
        await resetDatabase(prisma)
    });
    
    it("should create a new client", async () => {
        const clientJson = {
                "nomeCliente": "Victor Oliveira",
                "cpfCliente": "248.927.760-09",
                "celularCliente": "11956365632",
                "emailCliente": "victor@gmail.com"
            }

        const {status, body} = await  request(app).post("/clientes").send(clientJson)
        expect(status).toBe(201);
        expect(body).haveOwnProperty("message")  
        expect(body.message).toBe("Cliente cadastrado com sucesso!")

        
    });

    it("should't create a new client with invalid cpf", async () => {
        const clientJson = {
            "nomeCliente": "Victor Oliveira",
            "cpfCliente": "248.927.760-0",
            "celularCliente": "11956365632",
            "emailCliente": "email@emial.com"
        }

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O CPF é Inválido")
    });

    it("should't create a new client with invalid email", async () => {
        const clientJson = {
            "nomeCliente": "Victor Oliveira",
            "cpfCliente": "248.927.760-09",
            "celularCliente": "11956365632",
            "emailCliente": "email"
        }

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("Endereço de e-mail inválido!")
    });

    it("should't create a new client if cpf already exists", async () => {
        const clientJson = {
            "nomeCliente": "Victor Oliveira",
            "cpfCliente": "248.927.760-09",
            "celularCliente": "11956365632",
            "emailCliente": "email@emial.com"
        }

        await  request(app).post("/clientes").send(clientJson)

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O CPF já está cadastrado")

    });


    it("should't create a new client if email already exists", async () => {
        const clientJson = {
            "nomeCliente": "Victor Oliveira",
            "cpfCliente": "248.927.760-09",
            "celularCliente": "11956365632",
            "emailCliente": "email@emial.com"
        }

        await  request(app).post("/clientes").send(clientJson)

        clientJson.cpfCliente = "996.283.440-64"

        const {status, body} = await  request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("O e-mail já está cadastrado")

    });
    

    // Dando internal server error para um cliente com cpf e email vazios
    it("should't create a new client cpfCliente is missing", async () => {
        const clientJson = {
            "nomeCliente": "Victor Oliveira",
            "celularCliente": "11956365632",
            "emailCliente": "email@emial.com",
        }

        const {status, body}  = await request(app).post("/clientes").send(clientJson)

        expect(status).toBe(400);
        expect(body).haveOwnProperty("error")
        expect(body.error).toBe("Dados Inválidos")
    })

});

