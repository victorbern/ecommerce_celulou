import { Router } from "express";
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
import { deleteCategoriaController } from "./useCases/categorias/DeleteCategoria";
import { loginController } from "./useCases/autenticacao/Login";
import { createProdutoController } from "./useCases/produtos/CreateProduto";
import { findProdutoController } from "./useCases/produtos/FindProduto";
import { uploadMiddleware } from "./useCases/produtos/imagens/UploadImages/UploadMulterMiddleware";
import { deleteFolder } from "./useCases/produtos/imagens/DeleteImages/DeleteFolder";
import { produtoExistsMiddleware } from "./middlewares/ProdutoExistsMiddleware";
import { updateProdutoController } from "./useCases/produtos/UpdateProduto";

const router = Router();

// Rota temporária de login
router.post('/login', async (request, response, next) => {
    return loginController.handle(request, response, next);
})

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

// Deleta uma categoria pelo código
router.delete('/categoria/:codigo', async(request, response, next) => {
    return deleteCategoriaController.handle(request, response, next);
})

// Rota para criação de um produto novo
router.post('/produto/', async(request, response, next) => {
    return createProdutoController.handle(request, response, next);
}, )

// Rota para buscar um produto pelo código
router.get('/produto/:codigo', async(request, response, next) => {
    return findProdutoController.handle(request, response, next);
})

// Rota para fazer o upload das imagens do produto
router.post('/produto-images/:codigo', produtoExistsMiddleware, deleteFolder, uploadMiddleware, (request, response, next) => {
    response.status(200).json({ message: "Imagens salvas com sucesso!" })
});

// Rota para alterar os dados de um produto
router.put('/produto/:codigo', async (request, response, next) => {
    return updateProdutoController.handle(request, response, next);
});


export { router }