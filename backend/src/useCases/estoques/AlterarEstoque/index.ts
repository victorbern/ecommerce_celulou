import { alteracaoEstoqueFactory, estoqueFactory, produtoFactory } from "../../../factories";

const alterarEstoqueController = estoqueFactory.controllers.alterarEstoqueController(alteracaoEstoqueFactory, produtoFactory);

export { alterarEstoqueController }