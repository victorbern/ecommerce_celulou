import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { FindCategoriaController } from "./FindCategoriaController";
import { FindCategoriaUC } from "./FindCategoriaUC";

const findCategoriaUC = new FindCategoriaUC(postgresCategoriasRepository);
const findCategoriaController = new FindCategoriaController(findCategoriaUC);
const findCategoriaUCTest = new FindCategoriaUC(inMemoryCategoriasRepository);

export { findCategoriaUC, findCategoriaController, findCategoriaUCTest }