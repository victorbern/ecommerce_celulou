import { z } from "zod";

export class Estoque {
    public codigoEstoque: string;
    public quantidade: number;
    public codigoProduto: string;

    private static estoqueSchema = z.object({
        codigoEstoque: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string",
        }).length(12, { message: "O tamanho do código precisa ser de 12 caracteres" }),
        codigoProduto: z.string({
            required_error: "É necessário inserir um código para produto",
            invalid_type_error: "O código do produto precisa ser uma string",
        }).length(12, { message: "O código do produto precisa ser de 12 caracteres" }),
        quantidade: z.number({
            required_error: "É necessário inserir um valor para a quantidade do estoque",
            invalid_type_error: "A quantidade do estoque deve ser um número inteiro",
        }).int()
    })

    constructor(props: Estoque) {
        Estoque.estoqueSchema.parse(props);
        Object.assign(this, props);
    }
}