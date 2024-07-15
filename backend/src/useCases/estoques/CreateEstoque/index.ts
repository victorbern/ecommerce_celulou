import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { findProdutoUC, findProdutoUCTest } from "../../produtos/FindProduto";
import { CreateEstoqueUC } from "./CreateEstoqueUC";

const createEstoqueUC = new CreateEstoqueUC(postgresEstoquesRepository, findProdutoUC);
const createEstoqueUCTest = new CreateEstoqueUC(inMemoryEstoquesRepository, findProdutoUCTest);

export { createEstoqueUC, createEstoqueUCTest }