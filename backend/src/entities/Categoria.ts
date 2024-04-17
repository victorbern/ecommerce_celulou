import { z } from "zod";

export class Categoria {
    public codigoCategoria: string;
    public nomeCategoria: string;

    private static categoriaSchema = z.object({
        codigoCategoria: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string"
        }).length(12, { message: "O código precisa ter 12 caracteres" }),
        nomeCategoria: z.string({
            required_error: "É necessário inserir um nome para a categoria",
            invalid_type_error: "O nome da categoria precisa ser uma string"
        }).min(1, { message: "É necessário inserir um nome para a categoria" })
    });

    constructor(props: Categoria) {
        Categoria.categoriaSchema.parse(props);
        Object.assign(this, props);
    }
}