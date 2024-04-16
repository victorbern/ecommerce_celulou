import { Request, Response, NextFunction } from "express";
import { DeleteEnderecoUC } from "./DeleteEnderecoUC"

export class DeleteEnderecoController {
    constructor(
        private deleteEnderecoUC: DeleteEnderecoUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.deleteEnderecoUC.execute({
                codigoEndereco: codigo
            });

            return response.status(200).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    }
}