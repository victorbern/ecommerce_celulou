import { CreateEnderecoUC } from "./CreateEnderecoUC";
import { NextFunction, Request, Response } from "express";

export class CreateEnderecoController {
    constructor(
        private createEnderecoUC: CreateEnderecoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente } = request.body;
        try {
            let result = await this.createEnderecoUC.execute({
                cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente
            });

            return response.status(201).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}