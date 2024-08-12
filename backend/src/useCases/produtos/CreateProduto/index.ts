import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { findCategoriaUC, findCategoriaUCTest } from "../../categorias/FindCategoria";
import { createEstoqueUC, createEstoqueUCTest } from "../../estoques/CreateEstoque";
import { CreateProdutoController } from "./CreateProdutoController";
import { CreateProdutoUC } from "./CreateProdutoUC";

const createProdutoUC = new CreateProdutoUC(postgresProdutosRepository, findCategoriaUC, createEstoqueUC)
const createProdutoController = new CreateProdutoController(createProdutoUC);
const createProdutoUCTest = new CreateProdutoUC(produtosRepositoryMocked, findCategoriaUCTest, createEstoqueUCTest);

export { createProdutoUC, createProdutoController, createProdutoUCTest }