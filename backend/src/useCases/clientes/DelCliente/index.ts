import { postgresClientesRepository } from "../../../repositories/implementations";
import { inMemoryClientesRepository } from "../../../repositories/in-memory";
import { deleteEnderecoUC, deleteEnderecoUCTest } from "../../enderecos/DeleteEndereco";
import { findEnderecoByClienteUC, findEnderecoByClienteUCTest } from "../../enderecos/FindEnderecoByCliente";
import { DelClienteController } from "./DelClienteController";
import { DelClienteUC } from "./DelClienteUC";

const delClienteUC = new DelClienteUC(postgresClientesRepository, findEnderecoByClienteUC, deleteEnderecoUC);
const delClienteController = new DelClienteController(delClienteUC);

const delClienteUCTest = new DelClienteUC(inMemoryClientesRepository, findEnderecoByClienteUCTest, deleteEnderecoUCTest);

export { delClienteUC, delClienteController, delClienteUCTest }