import { z } from "zod";
import { encriptarSenhaUC } from "../utils/EncriptarSenha";

export class Cliente {
    public codigoCliente: string;
    public cpfCliente: string;
    public nomeCliente: string;
    public celularCliente: string;
    public emailCliente: string;
    public senha: string;
    public createdAt: Date;
    public isAdmin: Boolean;

    constructor(props: Omit<Cliente, 'codigoCliente'>, codigoCliente?: string) {
        Object.assign(this, props);
    }

    private isValid() {
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

        clienteSchema.parse({nomeCliente: this.nomeCliente, cpfCliente: this.cpfCliente, celularCliente: this.celularCliente, emailCliente: this.emailCliente, senha: this.senha})
    }

    public async encriptarSenha() {
        this.senha = (await encriptarSenhaUC.execute({ senha: this.senha })).hash;
    }
}