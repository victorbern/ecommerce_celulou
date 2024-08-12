import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindCategoriaController } from "./FindCategoriaController";
import { FindCategoriaUC } from "./FindCategoriaUC";

const findCategoriaUC = new FindCategoriaUC(postgresCategoriasRepository);
const findCategoriaController = new FindCategoriaController(findCategoriaUC);
const findCategoriaUCTest = new FindCategoriaUC(categoriasRepositoryMocked);

export { findCategoriaUC, findCategoriaController, findCategoriaUCTest }