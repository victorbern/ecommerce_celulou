import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { CreateCategoriaController } from "./CreateCategoriaController";
import { CreateCategoriaUC } from "./CreateCategoriaUC";

const createCategoriaUC = new CreateCategoriaUC(postgresCategoriasRepository);
const createCategoriaController = new CreateCategoriaController(createCategoriaUC);

const createCategoriaUCTest = new CreateCategoriaUC(inMemoryCategoriasRepository);

export { createCategoriaUC, createCategoriaController, createCategoriaUCTest }