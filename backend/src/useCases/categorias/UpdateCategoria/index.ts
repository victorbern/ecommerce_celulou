import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { UpdateCategoriaController } from "./UpdateCategoriaController";
import { UpdateCategoriaUC } from "./UpdateCategoriaUC";

const updateCategoriaUC = new UpdateCategoriaUC(postgresCategoriasRepository);
const updateCategoriaController = new UpdateCategoriaController(updateCategoriaUC);

const updateCategoriaUCTest = new UpdateCategoriaUC(categoriasRepositoryMocked);

export { updateCategoriaUC, updateCategoriaController, updateCategoriaUCTest }