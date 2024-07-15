import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { findProdutoUC, findProdutoUCTest } from "../../produtos/FindProduto";
import { FindCategoriasByProdutoController } from "./FindCategoriasByProdutoController";
import { FindCategoriasByProdutoUC } from "./FindCategoriasByProdutoUC";

const findCategoriasByProdutoUC = new FindCategoriasByProdutoUC(postgresCategoriasRepository, findProdutoUC);
const findCategoriasByProdutoController = new FindCategoriasByProdutoController(findCategoriasByProdutoUC)

const findCategoriasByProdutoUCTest = new FindCategoriasByProdutoUC(inMemoryCategoriasRepository, findProdutoUCTest)

export { findCategoriasByProdutoUC, findCategoriasByProdutoController, findCategoriasByProdutoUCTest }