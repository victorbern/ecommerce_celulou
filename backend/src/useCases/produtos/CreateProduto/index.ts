import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { CreateProdutoController } from "./CreateProdutoController";
import { CreateProdutoUC } from "./CreateProdutoUC";

const createProdutoUC = new CreateProdutoUC(postgresProdutosRepository)
const createProdutoController = new CreateProdutoController(createProdutoUC);
const createProdutoUCTest = new CreateProdutoUC(inMemoryProdutosRepository);

export { createProdutoUC, createProdutoController, createProdutoUCTest }