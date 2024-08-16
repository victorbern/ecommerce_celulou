import { clienteFactory, enderecoFactory } from "../../../factories";

const delClienteController = clienteFactory.controllers.delClienteController(enderecoFactory);

export { delClienteController }