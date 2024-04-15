import { z } from "zod";

export class Endereco {
    public codigoEndereco: string;
    public cep: string;
    public nomeRua: string;
    public numeroCasa: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    
    public codigoCliente: string;
    
    private static enderecoSchema = z.object({
        codigoEndereco: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string"
        }).length(12, { message: "O tamanho do código precisa ser de 12 caracteres" }),
        cep: z.string({
            required_error: "É necessário inserir um cep",
            invalid_type_error: "O cep precisa ser uma string"
        }).length(8, { message: "O tamanho do cep precisa ser de 8 caracteres" }),
        nomeRua: z.string({
            required_error: "É necessário inserir uma rua",
            invalid_type_error: "O nome da rua precisa ser uma string"
        }).min(1, { message: "É necessário inserir uma rua" }).max(30, { message: "O nome da rua não pode ter mais do que 30 caracteres" }),
        numeroCasa: z.string({
            required_error: "É necessário inserir um número",
            invalid_type_error: "O número deve ser uma string"
        }).min(1, { message: "É necessário inserir um número" }).max(10, { message: "O número da casa não pode ter mais do que 10 caracteres" }),
        complemento: z.string({
            invalid_type_error: "O complemento deve ser uma string"
        }).max(30, { message: "O complemento não pode ter mais do que 30 caracteres" }),
        bairro: z.string({
            required_error: "É necessário inserir um bairro",
            invalid_type_error: "O bairro deve ser uma string"
        }).min(1, { message: "É necessário inserir um bairro" }).max(30, { message: "O bairro não pode ter mais do que 30 caracteres" }),
        cidade: z.string({
            required_error: "É necessário inserir uma cidade",
            invalid_type_error: "A cidade deve ser uma string"
        }).min(1, { message: "É necessário inserir uma cidade" }).max(30, { message: "A cidade não pode ter mais do que 30 caracteres" }),
        estado: z.string({
            required_error: "É necessário inserir um estado",
            invalid_type_error: "O estado deve ser uma string"
        }).min(1, { message: "É necessário inserir um estado" }).max(30, { message: "O estado não pode ter mais do que 30 caracteres" })
    })

    constructor(props: Endereco) {
        Endereco.enderecoSchema.parse(props);
        Object.assign(this, props);
    }
}