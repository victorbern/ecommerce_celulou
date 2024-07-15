import { Request, Response, NextFunction } from "express";
import { CreateCategoriaUC } from "./CreateCategoriaUC";

export class CreateCategoriaController {
    constructor(
        private createCategoriaUC: CreateCategoriaUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { nomeCategoria } = request.body;
        try {
            let result = await this.createCategoriaUC.execute({nomeCategoria});

            return response.status(201).json({ message: result.message, codigoCategoria: result.codigoCategoria });
            
        } catch (error) {
            next(error);
        }
    }
}