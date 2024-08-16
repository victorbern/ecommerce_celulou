import { clienteFactory, enderecoFactory } from "../../../factories";

const createEnderecoController = enderecoFactory.controllers.createEnderecoController(clienteFactory);

export { createEnderecoController }