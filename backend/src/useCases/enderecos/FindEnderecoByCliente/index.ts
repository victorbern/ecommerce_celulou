import { postgresEnderecosRepository } from "../../../repositories/implementations";
import { enderecosRepositoryMocked } from "../../../repositories/implementations/tests";
import { findClienteUC, findClienteUCTest } from "../../clientes/FindCliente";
import { FindEnderecoByClienteController } from "./FindEnderecoByClienteController";
import { FindEnderecoByClienteUC } from "./FindEnderecoByClienteUC";

const findEnderecoByClienteUC = new FindEnderecoByClienteUC(postgresEnderecosRepository, findClienteUC);
const findEnderecoByClienteController = new FindEnderecoByClienteController(findEnderecoByClienteUC);

const findEnderecoByClienteUCTest = new FindEnderecoByClienteUC(enderecosRepositoryMocked, findClienteUCTest);

export { findEnderecoByClienteUC, findEnderecoByClienteController, findEnderecoByClienteUCTest }