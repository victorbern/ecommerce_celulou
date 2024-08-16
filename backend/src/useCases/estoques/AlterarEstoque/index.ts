import { alteracaoEstoqueFactory, estoqueFactory } from "../../../factories";

const alterarEstoqueController = estoqueFactory.controllers.alterarEstoqueController(alteracaoEstoqueFactory);

export { alterarEstoqueController }