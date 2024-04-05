import { postgresClientesRepository } from "../../../repositories/implementations";
import { FindClienteController } from "./FindClienteController";
import { FindClienteUC } from "./FindClienteUC";

const findClienteUC = new FindClienteUC(postgresClientesRepository);
const findClienteController = new FindClienteController(findClienteUC);

export { findClienteUC, findClienteController }