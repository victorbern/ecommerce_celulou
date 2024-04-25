import { Request, Response, NextFunction } from "express";
import { LoginUC } from "./LoginUC";

export class LoginController {
    constructor(
        private loginUC: LoginUC,
    ) {}

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
        const email = request.body.email;
        try {
            let result = await this.loginUC.execute({emailCliente: email});

            return response.status(200).json({ result: result });
        } catch (error) {
            next(error);
        }
    }
}