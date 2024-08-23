import { NextFunction, Request, Response } from "express";
import { FindClienteUC } from "./FindClienteUC";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";

export class FindClienteController {
    constructor(
        private findClienteUC: FindClienteUC,
    ) {}
    
    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const { codigo } = request.params;
        try {

            let result = await this.findClienteUC.execute({
                codigoCliente: codigo
            });

            if (result) {
                return response.status(HTTPStatusCode.OK).json({ result: result })
            }

            return response.status(HTTPStatusCode.NotFound).json({ error: "Cliente não encontrado"})
        } catch (error) {
            next(error);
        }
    }
}