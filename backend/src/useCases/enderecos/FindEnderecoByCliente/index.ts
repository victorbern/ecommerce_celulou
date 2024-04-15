import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { inMemoryEnderecosRepository } from "../../../repositories/in-memory";
import { findClienteUC, findClienteUCTest } from "../../clientes/FindCliente";
import { FindEnderecoByClienteController } from "./FindEnderecoByClienteController";
import { FindEnderecoByClienteUC } from "./FindEnderecoByClienteUC";

const findEnderecoByClienteUC = new FindEnderecoByClienteUC(postgresEnderecosRepository, findClienteUC);
const findEnderecoByClienteController = new FindEnderecoByClienteController(findEnderecoByClienteUC);

const findEnderecoByClienteUCTest = new FindEnderecoByClienteUC(inMemoryEnderecosRepository, findClienteUCTest);

export { findEnderecoByClienteUC, findEnderecoByClienteController, findEnderecoByClienteUCTest }