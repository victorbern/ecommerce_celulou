import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { findClienteUC, findClienteUCTest } from "../../clientes/FindCliente";
import { CreateEnderecoController } from "./CreateEnderecoController";
import { CreateEnderecoUC } from "./CreateEnderecoUC";

const createEnderecoUC = new CreateEnderecoUC(postgresEnderecosRepository, findClienteUC);
const createEnderecoController = new CreateEnderecoController(createEnderecoUC);

const createEnderecoUCTest = new CreateEnderecoUC(enderecosRepositoryMocked, findClienteUCTest);

export { createEnderecoUC, createEnderecoController, createEnderecoUCTest }