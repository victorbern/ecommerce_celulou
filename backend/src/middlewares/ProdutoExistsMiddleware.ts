import { Request, Response, NextFunction, RequestHandler } from "express";
import { produtoFactory } from "../factories";

const produtoExistsUC = produtoFactory.useCases.produtoExistsUseCase();

export const produtoExistsMiddleware: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const codigo = request.params.codigo;
    try {
        await produtoExistsUC.execute({ codigoProduto: codigo })

        next();
    } catch (error) {
        next(error);
    }
}