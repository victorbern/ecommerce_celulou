import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { DeleteEnderecoController } from "./DeleteEnderecoController";
import { DeleteEnderecoUC } from "./DeleteEnderecoUC";

const deleteEnderecoUC = new DeleteEnderecoUC(postgresEnderecosRepository);
const deleteEnderecoController = new DeleteEnderecoController(deleteEnderecoUC);

const deleteEnderecoUCTest = new DeleteEnderecoUC(inMemoryEnderecosRepository);

export { deleteEnderecoUC, deleteEnderecoController, deleteEnderecoUCTest }