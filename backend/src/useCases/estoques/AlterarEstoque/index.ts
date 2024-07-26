import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { createAlteracaoEstoqueUC, createAlteracaoEstoqueUCTest } from "../../alteracao_estoque/CreateAlteracaoEstoque";
import { AlterarEstoqueController } from "./AlterarEstoqueController";
import { AlterarEstoqueUC } from "./AlterarEstoqueUC";

const alterarEstoqueUC = new AlterarEstoqueUC(postgresEstoquesRepository, createAlteracaoEstoqueUC);
const alterarEstoqueController = new AlterarEstoqueController(alterarEstoqueUC);

const alterarEstoqueUCTest = new AlterarEstoqueUC(inMemoryEstoquesRepository, createAlteracaoEstoqueUCTest);

export { alterarEstoqueUC, alterarEstoqueController, alterarEstoqueUCTest }