import { postgresProdutosRepository } from "../../../repositories/implementations";
import { inMemoryProdutosRepository } from "../../../repositories/in-memory";
import { UpdateIsDisponivelProdutoController } from "./UpdateIsDisponivelProdutoController";
import { UpdateIsDisponivelProdutoUC } from "./UpdateIsDisponivelProdutoUC";

const updateIsDisponivelProdutoUC = new UpdateIsDisponivelProdutoUC(postgresProdutosRepository);
const updateIsDisponivelProdutoController = new UpdateIsDisponivelProdutoController(updateIsDisponivelProdutoUC);
const updateIsDisponivelProdutoUCTest = new UpdateIsDisponivelProdutoUC(inMemoryProdutosRepository);

export { updateIsDisponivelProdutoUC, updateIsDisponivelProdutoController, updateIsDisponivelProdutoUCTest }