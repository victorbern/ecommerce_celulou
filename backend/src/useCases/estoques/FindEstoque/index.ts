import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { estoquesRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindEstoqueController } from "./FindEstoqueController";
import { FindEstoqueUC } from "./FindEstoqueUC";

const findEstoqueUC = new FindEstoqueUC(postgresEstoquesRepository);
const findEstoqueController = new FindEstoqueController(findEstoqueUC);

const findEstoqueUCTest = new FindEstoqueUC(estoquesRepositoryMocked);

export { findEstoqueUC, findEstoqueController, findEstoqueUCTest }