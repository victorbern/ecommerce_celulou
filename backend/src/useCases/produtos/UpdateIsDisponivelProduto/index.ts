import { postgresProdutosRepository } from "../../../repositories/implementations";
import { produtosRepositoryMocked } from "../../../repositories/implementations/tests";
import { UpdateIsDisponivelProdutoController } from "./UpdateIsDisponivelProdutoController";
import { UpdateIsDisponivelProdutoUC } from "./UpdateIsDisponivelProdutoUC";

const updateIsDisponivelProdutoUC = new UpdateIsDisponivelProdutoUC(postgresProdutosRepository);
const updateIsDisponivelProdutoController = new UpdateIsDisponivelProdutoController(updateIsDisponivelProdutoUC);
const updateIsDisponivelProdutoUCTest = new UpdateIsDisponivelProdutoUC(produtosRepositoryMocked);

export { updateIsDisponivelProdutoUC, updateIsDisponivelProdutoController, updateIsDisponivelProdutoUCTest }