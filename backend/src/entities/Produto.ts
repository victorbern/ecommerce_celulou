import { z } from "zod";

export class Produto {
    public codigoProduto: string;
    public valor: number;
    public nomeProduto: string;
    public marca: string;
    public descricaoProduto: string;
    public imagensFolder: string;
    public nota: number;
    public pesoGramas: number;
    public alturaCM: number;
    public larguraCM: number;
    public comprimentoCM: number;
    public isDisponivelCompra: boolean = false;
    public isVisivel: boolean = false;

    private static produtoSchema = z.object({
        codigoProduto: z.string({
            required_error: "É necessário inserir um código",
            invalid_type_error: "O código precisa ser uma string"
        }).length(12, { message: "O tamanho do código precisa ser de 12 caracteres" }),
        valor: z.number({
            required_error: "É necessário inserir um valor",
            invalid_type_error: "O valor precisa ser um numero"
        }).min(0, { message: "O valor precisa ser maior ou igual a zero" }).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 10) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 8) {
                return false;
            }

            return true;
        }, {
            message: "O valor deve possuir até 10 digitos, sendo 2 deles decimais"
        }),
        nomeProduto: z.string({
            required_error: "É necessário inserir um nome para o produto",
            invalid_type_error: "O nome do produto precisa ser uma string"
        }).min(1, { message: "É necessário inserir um nome para o produto" }).max(60, { message: "O nome do produto não deve ter mais do que 60 caracteres" }),
        marca: z.string({
            required_error: "É necessário inserir uma marca",
            invalid_type_error: "A marca precisa ser uma string",
        }).min(1, { message: "É necessário inserir uma marca"}).max(60, { message: "A marca não deve possuir mais do que 60 caracteres" }),
        descricaoProduto: z.string({
            invalid_type_error: "A descrição precisa ser uma string"
        }),
        imagensFolder: z.string({
            invalid_type_error: "A imagensFolder precisa ser uma string"
        }).max(45, { message: "O imagensFolder não pode ter mais do que 45 caracteres" }),
        nota: z.number({
            
        }).min(0, { message: "A nota deve ser maior ou igual a zero"}).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 3) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 1) {
                return false;
            }

            return true;
        }, {
            message: "A nota deve possuir até 3 digitos, sendo 2 deles decimais"
        }).nullable(),
        pesoGramas: z.number({
            invalid_type_error: "O peso deve ser um número"
        }).min(0, { message: "O peso deve ser maior ou igual a zero" }).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 6) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 4) {
                return false;
            }

            return true;
        }, {
            message: "O peso deve possuir até 6 digitos, sendo 2 deles decimais"
        }),
        alturaCM: z.number({
            invalid_type_error: "A altura deve ser um número"
        }).min(0, { message: "A altura deve ser maior ou igual a zero" }).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 4) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 2) {
                return false;
            }

            return true;
        }, {
            message: "A altura deve possuir até 4 digitos, sendo 2 deles decimais"
        }),
        larguraCM: z.number({
            invalid_type_error: "A largura deve ser um número"
        }).min(0, { message: "A largura deve ser maior ou igual a zero" }).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 4) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 2) {
                return false;
            }

            return true;
        }, {
            message: "A largura deve possuir até 4 digitos, sendo 2 deles decimais"
        }),
        comprimentoCM: z.number({
            invalid_type_error: "O comprimento deve ser um número"
        }).min(0, { message: "O comprimento deve ser maior ou igual a zero" }).refine(valor => {
            const stringValue = valor.toString();
            const [parteInteira, parteDecimal] = stringValue.split(".");
            const digitosTotais = parteInteira.length + (parteDecimal ? parteDecimal.length : 0);
            if (digitosTotais > 4) {
                return false;
            }
            if (parteDecimal != null && parteDecimal.length > 2) {
                return false;
            }

            if (parteInteira.length > 2) {
                return false;
            }

            return true;
        }, {
            message: "O comprimento deve possuir até 4 digitos, sendo 2 deles decimais"
        }),
    })

    constructor(props: Omit<Produto, "isDisponivelCompra" | "isVisivel">, isDisponivelCompra?: boolean, isVisivel?: boolean) {
        Produto.produtoSchema.parse(props);
        Object.assign(this, props);
    }
}