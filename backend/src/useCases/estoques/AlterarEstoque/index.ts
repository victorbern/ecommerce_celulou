import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/tests";
import { createAlteracaoEstoqueUC, createAlteracaoEstoqueUCTest } from "../../alteracao_estoque/CreateAlteracaoEstoque";
import { AlterarEstoqueController } from "./AlterarEstoqueController";
import { AlterarEstoqueUC } from "./AlterarEstoqueUC";

const alterarEstoqueUC = new AlterarEstoqueUC(postgresEstoquesRepository, createAlteracaoEstoqueUC);
const alterarEstoqueController = new AlterarEstoqueController(alterarEstoqueUC);

const alterarEstoqueUCTest = new AlterarEstoqueUC(estoquesRepositoryMocked, createAlteracaoEstoqueUCTest);

export { alterarEstoqueUC, alterarEstoqueController, alterarEstoqueUCTest }