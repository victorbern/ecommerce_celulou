import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { UpdateIsVisibleProdutoController } from "./UpdateIsVisibleProdutoController";
import { UpdateIsVisibleProdutoUC } from "./UpdateIsVisibleProdutoUC";

const updateIsVisibleProdutoUC = new UpdateIsVisibleProdutoUC(postgresProdutosRepository);
const updateIsVisibleProdutoUCTest = new UpdateIsVisibleProdutoUC(inMemoryProdutosRepository);
const updateIsVisibleProdutoController = new UpdateIsVisibleProdutoController(updateIsVisibleProdutoUC);

export { updateIsVisibleProdutoUC, updateIsVisibleProdutoController, updateIsVisibleProdutoUCTest }