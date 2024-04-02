import { postgresClientesRepository } from "../../../repositories/implementations";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { CreateClienteController } from "./CreateClienteController";
import { CreateClienteUC } from "./CreateClienteUC";

// Classes da API
const createClienteUC = new CreateClienteUC(postgresClientesRepository);
const createClienteController = new CreateClienteController(createClienteUC);

// Classes de teste
const createClienteUCTest = new CreateClienteUC(inMemoryClientesRepository);

export { createClienteUC, createClienteController, createClienteUCTest }