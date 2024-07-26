import { z } from "zod";

export class AlteracaoEstoque {
    public codigoAlteracaoEstoque: string;
    public valorAlteracao: number;
    public dataAlteracao: Date;

    public codigoEstoque: string;

    private static alteracaoEstoqueSchema = z.object({
        codigoAlteracaoEstoque: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string",
        }).length(12, { message: "O código precisa ser de 12 caracteres" }),
        valorAlteracao: z.number({
            required_error: "É necessário inserir um valor de alteração",
            invalid_type_error: "O valor de alteração precisa ser um número inteiro",
        }).int().refine((valor) => valor !== 0, { message: "O valor de alteração não pode ser zero" }),
        dataAlteracao: z.date({
            required_error: "É necessário inserir uma data de alteração",
            invalid_type_error: "A data de alteração deve ser do tipo Date"
        }),
        codigoEstoque: z.string({
            required_error: "É necessário inserir um código do estoque",
            invalid_type_error: "O código do estoque precisa ser uma string"
        })
    })

    constructor(props: AlteracaoEstoque) {
        AlteracaoEstoque.alteracaoEstoqueSchema.parse(props);
        Object.assign(this, props);
    }
}