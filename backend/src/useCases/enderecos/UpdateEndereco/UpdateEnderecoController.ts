import { Request, Response, NextFunction } from "express";
import { UpdateEnderecoUC } from "./UpdateEnderecoUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class UpdateEnderecoController {
    constructor(
        private updateEnderecoUC: UpdateEnderecoUC,
    ) {}

    async handle (request: Request, response: Response, next: NextFunction) {
        const codigo = request.params.codigo;
        const { cep, nomeEndereco, nomeRua, numeroCasa, complemento, bairro, cidade, estado } = request.body;
        try {
            let result = await this.updateEnderecoUC.execute({
                codigoEndereco: codigo, nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado
            });

            return response.status(HTTPStatusCode.OK).json({ message: result.message });
            
        } catch (error) {
            next(error);
        }
    }
}