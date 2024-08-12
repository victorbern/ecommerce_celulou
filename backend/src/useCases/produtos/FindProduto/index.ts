import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindProdutoController } from "./FindProdutoController";
import { FindProdutoUC } from "./FindProdutoUC";

const findProdutoUC = new FindProdutoUC(postgresProdutosRepository);
const findProdutoController = new FindProdutoController(findProdutoUC);

const findProdutoUCTest = new FindProdutoUC(produtosRepositoryMocked);

export { findProdutoUC, findProdutoController, findProdutoUCTest }