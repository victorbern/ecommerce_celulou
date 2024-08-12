import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { UpdateProdutoController } from "./UpdateProdutoController";
import { UpdateProdutoUC } from "./UpdateProdutoUC";

const updateProdutoUC = new UpdateProdutoUC(postgresProdutosRepository);
const updateProdutoController = new UpdateProdutoController(updateProdutoUC);
const updateProdutoUCTest = new UpdateProdutoUC(produtosRepositoryMocked);

export { updateProdutoUC, updateProdutoController, updateProdutoUCTest }