import { Request, Response, NextFunction } from "express";
import { FindAllCategoriaUC } from "./FindAllCategoriaUC";

export class FindAllCategoriaController {
    constructor(
        private findAllCategoriaUC: FindAllCategoriaUC,
    ) {}

    async handle (request: Request, response: Response, next: NextFunction): Promise<Response> {
        const filtro = request.params.filtro;
        try {
            let result = await this.findAllCategoriaUC.execute({ filtro: filtro })

            if (result.length > 0) {
                return response.status(200).json({ result: result });
            }

            return response.status(404).json({ error: "Nenhuma categoria encontrada!" });
            
        } catch (error) {
            next(error);
        }
    }
}