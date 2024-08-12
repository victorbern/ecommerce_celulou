import { postgresClientesRepository } from "../../../repositories/implementations";
import { clientesRepositoryMocked } from "../../../repositories/implementations/tests";
import { FindClienteController } from "./FindClienteController";
import { FindClienteUC } from "./FindClienteUC";

const findClienteUC = new FindClienteUC(postgresClientesRepository);
const findClienteController = new FindClienteController(findClienteUC);

const findClienteUCTest = new FindClienteUC(clientesRepositoryMocked);
export { findClienteUC, findClienteController, findClienteUCTest }