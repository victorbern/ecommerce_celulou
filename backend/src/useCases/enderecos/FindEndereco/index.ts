import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { FindEnderecoController } from "./FindEnderecoController";
import { FindEnderecoUC } from "./FindEnderecoUC";

const findEnderecoUC = new FindEnderecoUC(postgresEnderecosRepository);
const findEnderecoController = new FindEnderecoController(findEnderecoUC);

const findEnderecoUCTest = new FindEnderecoUC(inMemoryEnderecosRepository);

export { findEnderecoUC, findEnderecoController, findEnderecoUCTest }