import { Router } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";
import { findClienteController } from "./useCases/clientes/FindCliente";
import { updateClienteController } from "./useCases/clientes/UpdateCliente";

const router = Router();

// Inserir novo cliente
router.post('/cliente', async (request, response) => {
    return createClienteController.handle(request, response);
})

// Busca um cliente pelo seu código
router.get('/cliente/:codigo', async (request, response) => {
    return findClienteController.handle(request, response);
});

// Editar dados de um cliente pelo código
router.put('/cliente/:codigo', async (request, response) => {
    return updateClienteController.handle(request, response);
})

export { router }