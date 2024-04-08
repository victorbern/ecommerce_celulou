import { postgresClientesRepository } from "../../../repositories/implementations";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { FindClienteController } from "./FindClienteController";
import { FindClienteUC } from "./FindClienteUC";

const findClienteUC = new FindClienteUC(postgresClientesRepository);
const findClienteController = new FindClienteController(findClienteUC);

const findClienteUCTest = new FindClienteUC(inMemoryClientesRepository);
export { findClienteUC, findClienteController, findClienteUCTest }