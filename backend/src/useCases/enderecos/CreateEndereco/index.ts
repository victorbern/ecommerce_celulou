import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { findClienteUC, findClienteUCTest } from "../../clientes/FindCliente";
import { CreateEnderecoController } from "./CreateEnderecoController";
import { CreateEnderecoUC } from "./CreateEnderecoUC";

const createEnderecoUC = new CreateEnderecoUC(postgresEnderecosRepository, findClienteUC);
const createEnderecoController = new CreateEnderecoController(createEnderecoUC);

const createEnderecoUCTest = new CreateEnderecoUC(inMemoryEnderecosRepository, findClienteUCTest);

export { createEnderecoUC, createEnderecoController, createEnderecoUCTest }