import { postgresClientesRepository } from "../../../repositories/implementations";
import { clientesRepositoryMocked } from "../../../repositories/implementations/tests";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { UpdateClienteController } from "./UpdateClienteController";
import { UpdateClienteUC } from "./UpdateClienteUC";

const updateClienteUC = new UpdateClienteUC(postgresClientesRepository);
const updateClienteController = new UpdateClienteController(updateClienteUC);

const updateClienteUCTest = new UpdateClienteUC(clientesRepositoryMocked);

export { updateClienteUC, updateClienteController, updateClienteUCTest }