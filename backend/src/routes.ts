import { Router } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";

const router = Router();

// Inserir novo cliente
router.post('/cliente', async (request, response) => {
    return createClienteController.handle(request, response);
})

export { router }