import { describe, expect, test } from "vitest";
import { Endereco } from "./Endereco";

describe("Testing the entity Endereco", () => {

    test("Should be able to create a Endereco object", () => {
        expect(new Endereco({
            codigoEndereco: "E12123123123",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "1A",
            complemento: "",
            bairro: "Jd. San Marino",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "C12QWEQWEQWE"
        })).satisfies;
    });

    test("Should not be able to create a Endereco object", () => {
        // Testando codigoEndereco
        // Tentando criar um objeto de endereço com codigoEndereco vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O tamanho do código precisa ser de 12 caracteres")

        // Tentando criar um objeto de endereço com codigoEndereco sem ser string
        expect(() => {
            new Endereco({
                codigoEndereco: null,
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O código precisa ser uma string");

        // Tentando criar um objeto de endereço com um codigoEndereco com tamanho diferente de 12 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "E1212312313",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O tamanho do código precisa ser de 12 caracteres");

        // Testando cep
        // Tentando criar um endereço com cep vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: "",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O tamanho do cep precisa ser de 8 caracteres")

        // Tentando criar um endereco com cep diferente de string
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: null,
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            });
        }).toThrow("O cep precisa ser uma string");

        // Tentando criar um endereço com um cep com tamanho diferente de 8 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: "1297000011",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O tamanho do cep precisa ser de 8 caracteres");

        // Testando nome da rua
        // Testando criar um endereço com nome da rua vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: "12970000",
                nomeRua: "",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("É necessário inserir uma rua");

        // Testando criar um endereço com o nome da rua diferente de string
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: "12970000",
                nomeRua: null,
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O nome da rua precisa ser uma string")

        // Testando inserir uma rua com mais de 30 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "E12123123123",
                cep: "12970000",
                nomeRua: "Rua 1 Lorem Ipsum is simply dummy text of the printing and",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O nome da rua não pode ter mais do que 30 caracteres");

        // Testando numeroCasa
        // Criar endereço com numeroCasa vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("É necessário inserir um número");

        // Criar endereço com numero da casa não sendo uma string
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: null,
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O número deve ser uma string");

        // Criar endereço com numero da casa com tamanho maior do que 10 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "12345678901",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O número da casa não pode ter mais do que 10 caracteres");

        // Testando complemento
        // Criar endereço com complemento diferente de string
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: null,
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O complemento deve ser uma string");

        // Testando criar endereco com complemento maior do que 30 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: null,
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O complemento deve ser uma string")

        // Testando bairro
        // Testando criar endereço com bairro vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("É necessário inserir um bairro");

        // Testando criar endereço com bairro não sendo uma string
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: null,
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O bairro deve ser uma string");

        // Testando criar endereço com bairro com tamanho maior do que 30 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jardim San Marino dos Lorem Ipsum Dolor Sit Amet",
                cidade: "Piracaia",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O bairro não pode ter mais do que 30 caracteres");

        // Testando cidade
        // Testando criar endereço com cidade vazia
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("É necessário inserir uma cidade");

        // Testando criar endereço com cidade não sendo uma string
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: null,
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("A cidade deve ser uma string");

        // Testando criar endereço com cidade com tamanho maior do que 30 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia dos Lorem Ipsum Dolor Sit Amet",
                estado: "São Paulo",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("A cidade não pode ter mais do que 30 caracteres");

        // Testando estado
        // Testando criar endereço com estado vazio
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("É necessário inserir um estado");

        // Testando criar endereço com estado não sendo uma string
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: null,
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O estado deve ser uma string");

        // Testando criar endereço com estado com tamanho maior do que 30 caracteres
        expect(() => {
            new Endereco({
                codigoEndereco: "123456789012",
                cep: "12970000",
                nomeRua: "Rua 1",
                numeroCasa: "1A",
                complemento: "",
                bairro: "Jd. San Marino",
                cidade: "Piracaia",
                estado: "São Paulo dos Lorem Ipsum Dolor Sit Amet",
                codigoCliente: "C12QWEQWEQWE"
            })
        }).toThrow("O estado não pode ter mais do que 30 caracteres");
    })
})