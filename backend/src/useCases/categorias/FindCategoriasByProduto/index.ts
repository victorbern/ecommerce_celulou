import { categoriaFactory, produtoFactory } from "../../../factories";

const findCategoriasByProdutoController = categoriaFactory.controllers.findCategoriasByProdutoController(produtoFactory);

export { findCategoriasByProdutoController }