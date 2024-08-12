import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindEnderecoController } from "./FindEnderecoController";
import { FindEnderecoUC } from "./FindEnderecoUC";

const findEnderecoUC = new FindEnderecoUC(postgresEnderecosRepository);
const findEnderecoController = new FindEnderecoController(findEnderecoUC);

const findEnderecoUCTest = new FindEnderecoUC(enderecosRepositoryMocked);

export { findEnderecoUC, findEnderecoController, findEnderecoUCTest }