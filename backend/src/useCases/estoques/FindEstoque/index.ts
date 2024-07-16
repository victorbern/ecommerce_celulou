import { postgresEstoquesRepository } from "../../../repositories/implementations";
import { inMemoryEstoquesRepository } from "../../../repositories/in-memory";
import { FindEstoqueController } from "./FindEstoqueController";
import { FindEstoqueUC } from "./FindEstoqueUC";

const findEstoqueUC = new FindEstoqueUC(postgresEstoquesRepository);
const findEstoqueController = new FindEstoqueController(findEstoqueUC);

const findEstoqueUCTest = new FindEstoqueUC(inMemoryEstoquesRepository);

export { findEstoqueUC, findEstoqueController, findEstoqueUCTest }