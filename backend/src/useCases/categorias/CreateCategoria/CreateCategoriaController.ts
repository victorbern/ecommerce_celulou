import { Request, Response, NextFunction } from "express";
import { CreateCategoriaUC } from "./CreateCategoriaUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class CreateCategoriaController {
    constructor(
        private createCategoriaUC: CreateCategoriaUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { nomeCategoria } = request.body;
        try {
            let result = await this.createCategoriaUC.execute({nomeCategoria});

            return response.status(HTTPStatusCode.Created).json({ message: result.message, codigoCategoria: result.codigoCategoria });
            
        } catch (error) {
            next(error);
        }
    }
}