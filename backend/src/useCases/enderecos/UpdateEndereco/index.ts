import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { UpdateEnderecoController } from "./UpdateEnderecoController";
import { UpdateEnderecoUC } from "./UpdateEnderecoUC";

const updateEnderecoUC = new UpdateEnderecoUC(postgresEnderecosRepository);
const updateEnderecoController = new UpdateEnderecoController(updateEnderecoUC);

const updateEnderecoUCTest = new UpdateEnderecoUC(enderecosRepositoryMocked);

export { updateEnderecoUC, updateEnderecoController, updateEnderecoUCTest }