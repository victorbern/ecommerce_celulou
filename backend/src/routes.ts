import { Router, request } from "express";
import { createClienteController } from "./useCases/clientes/CreateCliente";
import { findClienteController } from "./useCases/clientes/FindCliente";
import { updateClienteController } from "./useCases/clientes/UpdateCliente";
import { delClienteController } from "./useCases/clientes/DelCliente";
import { createEnderecoController } from "./useCases/enderecos/CreateEndereco";
import { findEnderecoByClienteController } from "./useCases/enderecos/FindEnderecoByCliente";
import { findEnderecoController } from "./useCases/enderecos/FindEndereco";
import { updateEnderecoController } from "./useCases/enderecos/UpdateEndereco";
import { deleteEnderecoController } from "./useCases/enderecos/DeleteEndereco";
import { createCategoriaController } from "./useCases/categorias/CreateCategoria";
import { findAllCategoriaController } from "./useCases/categorias/FindAllCategoria";
import { updateCategoriaController } from "./useCases/categorias/UpdateCategoria";

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

// Deletar um cliente pelo código
router.delete('/cliente/:codigo', async (request, response, next) => {
    return delClienteController.handle(request, response, next);
})

// Inserir novo endereço
router.post('/endereco', async (request, response, next) => {
    return createEnderecoController.handle(request, response, next);
})

// Buscar endereço pelo codigo do cliente
router.get('/enderecos/:codigo', async (request, response, next) => {
    return findEnderecoByClienteController.handle(request, response, next);
})

// Buscar endereço pelo codigo do endereço
router.get('/endereco/:codigo', async (request, response, next) => {
    return findEnderecoController.handle(request, response, next);
})

// Editar dados de um endereço pelo código
router.put('/endereco/:codigo', async (request, response, next) => {
    return updateEnderecoController.handle(request, response, next);
})

// Deleta um endereço pelo código
router.delete('/endereco/:codigo', async (request, response, next) => {
    return deleteEnderecoController.handle(request, response, next);
})

// Inserir nova categoria
router.post('/categoria/', async (request, response, next) => {
    return createCategoriaController.handle(request, response, next);
})

// Buscar todas as categorias
router.get('/categorias/', async (request, response, next) => {
    return findAllCategoriaController.handle(request, response, next);
})

// Buscar todas as categorias (com filtro)
router.get('/categorias/:filtro', async (request, response, next) => {
    return findAllCategoriaController.handle(request, response, next);
})

// Alterar dados de uma categoria
router.put('/categoria/:codigo', async(request, response, next) => {
    return updateCategoriaController.handle(request, response, next);
})

export { router }