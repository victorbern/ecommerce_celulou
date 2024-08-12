import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/tests";
import { findProdutoUC, findProdutoUCTest } from "../../produtos/FindProduto";
import { CreateEstoqueUC } from "./CreateEstoqueUC";

const createEstoqueUC = new CreateEstoqueUC(postgresEstoquesRepository, findProdutoUC);
const createEstoqueUCTest = new CreateEstoqueUC(estoquesRepositoryMocked, findProdutoUCTest);

export { createEstoqueUC, createEstoqueUCTest }