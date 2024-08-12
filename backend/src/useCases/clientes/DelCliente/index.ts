import { postgresClientesRepository } from "../../../repositories/implementations";
import { clientesRepositoryMocked } from "../../../repositories/implementations/tests";
import { deleteEnderecoUC, deleteEnderecoUCTest } from "../../enderecos/DeleteEndereco";
import { findEnderecoByClienteUC, findEnderecoByClienteUCTest } from "../../enderecos/FindEnderecoByCliente";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const delClienteUC = new DelClienteUC(postgresClientesRepository, findEnderecoByClienteUC, deleteEnderecoUC);
const delClienteController = new DelClienteController(delClienteUC);

const delClienteUCTest = new DelClienteUC(clientesRepositoryMocked, findEnderecoByClienteUCTest, deleteEnderecoUCTest);

export { delClienteUC, delClienteController, delClienteUCTest }