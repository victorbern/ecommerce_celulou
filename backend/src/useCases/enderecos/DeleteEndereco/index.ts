import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { DeleteEnderecoController } from "./DeleteEnderecoController";
import { DeleteEnderecoUC } from "./DeleteEnderecoUC";

const deleteEnderecoUC = new DeleteEnderecoUC(postgresEnderecosRepository);
const deleteEnderecoController = new DeleteEnderecoController(deleteEnderecoUC);

const deleteEnderecoUCTest = new DeleteEnderecoUC(enderecosRepositoryMocked);

export { deleteEnderecoUC, deleteEnderecoController, deleteEnderecoUCTest }