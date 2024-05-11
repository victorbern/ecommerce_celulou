import { Request, Response, NextFunction, RequestHandler } from "express";
import { findProdutoUC } from "../useCases/produtos/FindProduto";

export const produtoExistsMiddleware: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const codigo = request.params.codigo;
    try {
        await findProdutoUC.execute({ codigoProduto: codigo })

        next();
    } catch (error) {
        next(error);
    }
}