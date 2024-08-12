import { postgresCategoriasRepository } from "../../../repositories/implementations";
import { categoriasRepositoryMocked } from "../../../repositories/implementations/tests";
import { CreateCategoriaController } from "./CreateCategoriaController";
import { CreateCategoriaUC } from "./CreateCategoriaUC";

const createCategoriaUC = new CreateCategoriaUC(postgresCategoriasRepository);
const createCategoriaController = new CreateCategoriaController(createCategoriaUC);

const createCategoriaUCTest = new CreateCategoriaUC(categoriasRepositoryMocked);

export { createCategoriaUC, createCategoriaController, createCategoriaUCTest }