import { postgresAlteracaoEstoqueRepository } from "../../../repositories/implementations";
import { inMemoryAlteracaoEstoqueRepository } from "../../../repositories/in-memory";
import { findEstoqueUC, findEstoqueUCTest } from "../../estoques/FindEstoque";
import { CreateAlteracaoEstoqueUC } from "./CreateAlteracaoEstoqueUC";

const createAlteracaoEstoqueUCTest = new CreateAlteracaoEstoqueUC(inMemoryAlteracaoEstoqueRepository, findEstoqueUCTest);
const createAlteracaoEstoqueUC = new CreateAlteracaoEstoqueUC(postgresAlteracaoEstoqueRepository, findEstoqueUC);

export { createAlteracaoEstoqueUC, createAlteracaoEstoqueUCTest }