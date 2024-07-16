import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { findCategoriaUC, findCategoriaUCTest } from "../../categorias/FindCategoria";
import { createEstoqueUC, createEstoqueUCTest } from "../../estoques/CreateEstoque";
import { CreateProdutoController } from "./CreateProdutoController";
import { CreateProdutoUC } from "./CreateProdutoUC";

const createProdutoUC = new CreateProdutoUC(postgresProdutosRepository, findCategoriaUC, createEstoqueUC)
const createProdutoController = new CreateProdutoController(createProdutoUC);
const createProdutoUCTest = new CreateProdutoUC(inMemoryProdutosRepository, findCategoriaUCTest, createEstoqueUCTest);

export { createProdutoUC, createProdutoController, createProdutoUCTest }