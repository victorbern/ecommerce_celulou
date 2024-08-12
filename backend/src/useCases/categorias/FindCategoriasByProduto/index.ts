import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { findProdutoUC, findProdutoUCTest } from "../../produtos/FindProduto";
import { FindCategoriasByProdutoController } from "./FindCategoriasByProdutoController";
import { FindCategoriasByProdutoUC } from "./FindCategoriasByProdutoUC";

const findCategoriasByProdutoUC = new FindCategoriasByProdutoUC(postgresCategoriasRepository, findProdutoUC);
const findCategoriasByProdutoController = new FindCategoriasByProdutoController(findCategoriasByProdutoUC)

const findCategoriasByProdutoUCTest = new FindCategoriasByProdutoUC(categoriasRepositoryMocked, findProdutoUCTest)

export { findCategoriasByProdutoUC, findCategoriasByProdutoController, findCategoriasByProdutoUCTest }