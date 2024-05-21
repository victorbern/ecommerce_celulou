import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { UpdateProdutoController } from "./UpdateProdutoController";
import { UpdateProdutoUC } from "./UpdateProdutoUC";

const updateProdutoUC = new UpdateProdutoUC(postgresProdutosRepository);
const updateProdutoController = new UpdateProdutoController(updateProdutoUC);
const updateProdutoUCTest = new UpdateProdutoUC(inMemoryProdutosRepository);

export { updateProdutoUC, updateProdutoController, updateProdutoUCTest }