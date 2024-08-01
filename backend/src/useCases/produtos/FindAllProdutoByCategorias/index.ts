import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { FindAllProdutoByCategoriasController } from "./FindAllProdutoByCategoriasController";
import { FindAllProdutoByCategoriasUC } from "./FindAllProdutoByCategoriasUC";

const findAllProdutoByCategoriasUC = new FindAllProdutoByCategoriasUC(postgresProdutosRepository);
const findAllProdutoByCategoriasController = new FindAllProdutoByCategoriasController(findAllProdutoByCategoriasUC);
const findAllProdutoByCategoriasUCTest = new FindAllProdutoByCategoriasUC(inMemoryProdutosRepository);

export { findAllProdutoByCategoriasUC, findAllProdutoByCategoriasController, findAllProdutoByCategoriasUCTest }