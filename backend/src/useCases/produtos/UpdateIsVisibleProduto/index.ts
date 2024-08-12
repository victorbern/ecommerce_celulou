import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { UpdateIsVisibleProdutoController } from "./UpdateIsVisibleProdutoController";
import { UpdateIsVisibleProdutoUC } from "./UpdateIsVisibleProdutoUC";

const updateIsVisibleProdutoUC = new UpdateIsVisibleProdutoUC(postgresProdutosRepository);
const updateIsVisibleProdutoUCTest = new UpdateIsVisibleProdutoUC(produtosRepositoryMocked);
const updateIsVisibleProdutoController = new UpdateIsVisibleProdutoController(updateIsVisibleProdutoUC);

export { updateIsVisibleProdutoUC, updateIsVisibleProdutoController, updateIsVisibleProdutoUCTest }