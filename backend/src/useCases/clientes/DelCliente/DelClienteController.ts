import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { DelClienteUC } from "./DelClienteUC";
import { NextFunction, Request, Response } from "express";

export class DelClienteController {
    constructor(
        private delClienteUC: DelClienteUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const codigo = request.params.codigo;
        try {
            let result = await this.delClienteUC.execute({
                codigoCliente: codigo,
            });

            return response.status(HTTPStatusCode.OK).json({ message: result.message })
        } catch (error) {
            next(error);
        }
    }
}