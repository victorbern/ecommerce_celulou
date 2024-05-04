import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { FindProdutoController } from "./FindProdutoController";
import { FindProdutoUC } from "./FindProdutoUC";

const findProdutoUC = new FindProdutoUC(postgresProdutosRepository);
const findProdutoController = new FindProdutoController(findProdutoUC);

const findProdutoUCTest = new FindProdutoUC(inMemoryProdutosRepository);

export { findProdutoUC, findProdutoController, findProdutoUCTest }