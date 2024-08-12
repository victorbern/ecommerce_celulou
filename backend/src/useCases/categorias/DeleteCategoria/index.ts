import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { DeleteCategoriaController } from "./DeleteCategoriaController";
import { DeleteCategoriaUC } from "./DeleteCategoriaUC";

const deleteCategoriaUC = new DeleteCategoriaUC(postgresCategoriasRepository);
const deleteCategoriaController = new DeleteCategoriaController(deleteCategoriaUC);

const deleteCategoriaUCTest = new DeleteCategoriaUC(categoriasRepositoryMocked);

export { deleteCategoriaUC, deleteCategoriaController, deleteCategoriaUCTest }