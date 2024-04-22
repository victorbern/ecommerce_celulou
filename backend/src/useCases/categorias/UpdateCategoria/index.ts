import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { UpdateCategoriaController } from "./UpdateCategoriaController";
import { UpdateCategoriaUC } from "./UpdateCategoriaUC";

const updateCategoriaUC = new UpdateCategoriaUC(postgresCategoriasRepository);
const updateCategoriaController = new UpdateCategoriaController(updateCategoriaUC);

const updateCategoriaUCTest = new UpdateCategoriaUC(inMemoryCategoriasRepository);

export { updateCategoriaUC, updateCategoriaController, updateCategoriaUCTest }