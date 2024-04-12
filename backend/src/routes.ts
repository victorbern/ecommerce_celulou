import { Router } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";
import { findClienteController } from "./useCases/clientes/FindCliente";
import { updateClienteController } from "./useCases/clientes/UpdateCliente";

const router = Router();

// Inserir novo cliente
router.post('/cliente', async (request, response, next) => {
    return createClienteController.handle(request, response, next);
})

// Busca um cliente pelo seu código
router.get('/cliente/:codigo', async (request, response, next) => {
    return findClienteController.handle(request, response, next);
});

// Editar dados de um cliente pelo código
router.put('/cliente/:codigo', async (request, response, next) => {
    return updateClienteController.handle(request, response, next);
})

export { router }