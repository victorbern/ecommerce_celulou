import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { FindAllCategoriaController } from "./FindAllCategoriaController";
import { FindAllCategoriaUC } from "./FindAllCategoriaUC";

const findAllCategoriaUC = new FindAllCategoriaUC(postgresCategoriasRepository);
const findAllCategoriaController = new FindAllCategoriaController(findAllCategoriaUC);

const findAllCategoriaUCTest = new FindAllCategoriaUC(inMemoryCategoriasRepository);

export { findAllCategoriaUC, findAllCategoriaController, findAllCategoriaUCTest }