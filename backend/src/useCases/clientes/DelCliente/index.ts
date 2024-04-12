import { postgresClientesRepository } from "../../../repositories/implementations";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const delClienteUC = new DelClienteUC(postgresClientesRepository);
const delClienteController = new DelClienteController(delClienteUC);

const delClienteUCTest = new DelClienteUC(inMemoryClientesRepository);

export { delClienteUC, delClienteController, delClienteUCTest }