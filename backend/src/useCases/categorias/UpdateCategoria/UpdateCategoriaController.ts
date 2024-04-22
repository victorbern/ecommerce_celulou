import { Request, Response, NextFunction } from "express";
import { UpdateCategoriaUC } from "./UpdateCategoriaUC";

export class UpdateCategoriaController {
    constructor(
        private updateCategoriaUC: UpdateCategoriaUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        const { nomeCategoria } = request.body;
        try {
            let result = await this.updateCategoriaUC.execute({
                codigoCategoria: codigo, nomeCategoria
            });

            return response.status(200).json({ message: result.message })
        } catch (error) {
            next(error);
        }
    }
}