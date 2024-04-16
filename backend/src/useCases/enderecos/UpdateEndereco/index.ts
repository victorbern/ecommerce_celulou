import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { UpdateEnderecoController } from "./UpdateEnderecoController";
import { UpdateEnderecoUC } from "./UpdateEnderecoUC";

const updateEnderecoUC = new UpdateEnderecoUC(postgresEnderecosRepository);
const updateEnderecoController = new UpdateEnderecoController(updateEnderecoUC);

const updateEnderecoUCTest = new UpdateEnderecoUC(inMemoryEnderecosRepository);

export { updateEnderecoUC, updateEnderecoController, updateEnderecoUCTest }