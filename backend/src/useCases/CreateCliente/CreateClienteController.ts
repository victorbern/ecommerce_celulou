import { Request, Response } from "express";
import { generateCodigoUC } from "../../utils/GenerateCodigo";

export class CreateClienteController {
    constructor(
        
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { cpfCliente, nomeCliente, celularCliente, emailCliente, senha } = request.body;
            let codigo = "C" + generateCodigoUC;
            let createdAt = new Date(Date.now());
            let isAdmin = false;



            return null;
        } catch (error) {

        }
    }
}