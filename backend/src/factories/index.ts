import { postgresAlteracaoEstoqueRepository, postgresCategoriasRepository, postgresClientesRepository, postgresEnderecosRepository, postgresEstoquesRepository, postgresProdutosRepository } from "../repositories/implementations";
import { AlteracaoEstoqueFactory } from "./AlteracaoEstoqueFactory";
import { CategoriaFactory } from "./CategoriaFactory";
import { ClienteFactory } from "./ClienteFactory";
import { EnderecoFactory } from "./EnderecoFactory";
import { EstoqueFactory } from "./EstoqueFactory";
import { ProdutoFactory } from "./ProdutoFactory";

const clienteFactory = new ClienteFactory(postgresClientesRepository);
const enderecoFactory = new EnderecoFactory(postgresEnderecosRepository);
const categoriaFactory = new CategoriaFactory(postgresCategoriasRepository);
const produtoFactory = new ProdutoFactory(postgresProdutosRepository);
const estoqueFactory = new EstoqueFactory(postgresEstoquesRepository);
const alteracaoEstoqueFactory = new AlteracaoEstoqueFactory(postgresAlteracaoEstoqueRepository);

export { clienteFactory, enderecoFactory, categoriaFactory, produtoFactory, estoqueFactory, alteracaoEstoqueFactory }