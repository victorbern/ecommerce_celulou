import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { inMemoryCategoriasRepository } from "../../../repositories/in-memory";
import { DeleteCategoriaController } from "./DeleteCategoriaController";
import { DeleteCategoriaUC } from "./DeleteCategoriaUC";

const deleteCategoriaUC = new DeleteCategoriaUC(postgresCategoriasRepository);
const deleteCategoriaController = new DeleteCategoriaController(deleteCategoriaUC);

const deleteCategoriaUCTest = new DeleteCategoriaUC(inMemoryCategoriasRepository);

export { deleteCategoriaUC, deleteCategoriaController, deleteCategoriaUCTest }