import { AppError } from "../../../errors/AppError";
import { ZodError, z } from "zod";
import { IValidarFormClienteRequestDTO } from "./ValidarFormClienteDTO";

export class ValidarFormClienteUC {
    constructor() { }

    async execute(data: IValidarFormClienteRequestDTO) {

        const clienteSchema = z.object({
            nomeCliente: z.string({
                required_error: "É necessário inserir um nome",
                invalid_type_error: "O nome precisa ser uma string"
            }).max(45, { message: "O nome não pode ter mais do que 45 caracteres" }),
            cpfCliente: z.string({
                required_error: "É necessário inserir um CPF",
                invalid_type_error: "O CPF precisa ser uma string"
            }).length(11, { message: "O CPF deve ter 11 dígitos" }),
            celularCliente: z.string({
                invalid_type_error: "O número de celular deve ser uma string"
            }).max(12, { message: "O tamanho máximo para número de celular deve ser de 12 caracteres " }),
            emailCliente: z.string({
                required_error: "É necessário inserir um e-mail",
                invalid_type_error: "O e-mail deve ser uma string"
            }).email({ message: "Endereço de e-mail inválido! " }),
            senha: z.string({
                required_error: "É necessário inserir uma senha",
                invalid_type_error: "A senha deve ser uma string",
            }).min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
        })

        const cliente = {
            nomeCliente: data.nomeCliente,
            cpfCliente: data.cpfCliente,
            celularCliente: data.celularCliente,
            emailCliente: data.emailCliente,
            senha: data.senha
        }
        try {
            clienteSchema.parse(cliente);
            return;
        } catch (error) {
            if (error instanceof Error || error instanceof ZodError) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }
}