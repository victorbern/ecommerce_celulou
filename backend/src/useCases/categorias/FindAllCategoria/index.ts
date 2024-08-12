import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindAllCategoriaController } from "./FindAllCategoriaController";
import { FindAllCategoriaUC } from "./FindAllCategoriaUC";

const findAllCategoriaUC = new FindAllCategoriaUC(postgresCategoriasRepository);
const findAllCategoriaController = new FindAllCategoriaController(findAllCategoriaUC);

const findAllCategoriaUCTest = new FindAllCategoriaUC(categoriasRepositoryMocked);

export { findAllCategoriaUC, findAllCategoriaController, findAllCategoriaUCTest }