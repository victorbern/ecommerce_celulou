import { postgresClientesRepository } from "../../../repositories/implementations";
import { clientesRepositoryMocked } from "../../../repositories/implementations/tests";
import { CreateClienteController } from "./CreateClienteController";
import { CreateClienteUC } from "./CreateClienteUC";

// Classes da API
const createClienteUC = new CreateClienteUC(postgresClientesRepository);
const createClienteController = new CreateClienteController(createClienteUC);

// Classes de teste
const createClienteUCTest = new CreateClienteUC(clientesRepositoryMocked);

export { createClienteUC, createClienteController, createClienteUCTest }