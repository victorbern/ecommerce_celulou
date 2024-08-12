import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindAllProdutoByCategoriasController } from "./FindAllProdutoByCategoriasController";
import { FindAllProdutoByCategoriasUC } from "./FindAllProdutoByCategoriasUC";
import { FindAllProdutoUC } from "./FindAllProdutoUC";

const findAllProdutoByCategoriasUC = new FindAllProdutoByCategoriasUC(postgresProdutosRepository);
const findAllProdutoUC = new FindAllProdutoUC(postgresProdutosRepository);
const findAllProdutoByCategoriasController = new FindAllProdutoByCategoriasController(findAllProdutoByCategoriasUC, findAllProdutoUC);
const findAllProdutoByCategoriasUCTest = new FindAllProdutoByCategoriasUC(produtosRepositoryMocked);

export { findAllProdutoByCategoriasUC, findAllProdutoUC, findAllProdutoByCategoriasController, findAllProdutoByCategoriasUCTest }