import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { CreateEnderecoUC } from "./CreateEnderecoUC";
import { NextFunction, Request, Response } from "express";

export class CreateEnderecoController {
    constructor(
        private createEnderecoUC: CreateEnderecoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigoCliente = request.params.codigo;
        const { nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado } = request.body;
        try {
            let result = await this.createEnderecoUC.execute({
                nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente
            });

            return response.status(HTTPStatusCode.Created).json({ message: result.message, codigoEndereco: result.codigoEndereco });
        } catch (error) {
            next(error);
        }
    }
}