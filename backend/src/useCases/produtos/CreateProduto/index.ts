import { categoriaFactory, estoqueFactory, produtoFactory } from "../../../factories";

const createProdutoController = produtoFactory.controllers.createProdutoController(categoriaFactory, estoqueFactory);

export { createProdutoController }