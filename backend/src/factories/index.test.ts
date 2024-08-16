import { alteracaoEstoqueRepositoryMocked, categoriasRepositoryMocked, clientesRepositoryMocked, enderecosRepositoryMocked, estoquesRepositoryMocked, produtosRepositoryMocked } from '../repositories/implementations/index.test'
import { AlteracaoEstoqueFactory } from "./AlteracaoEstoqueFactory";
import { CategoriaFactory } from "./CategoriaFactory";
import { ClienteFactory } from "./ClienteFactory";
import { EnderecoFactory } from "./EnderecoFactory";
import { EstoqueFactory } from "./EstoqueFactory";
import { ProdutoFactory } from "./ProdutoFactory";

const clienteFactoryTest = new ClienteFactory(clientesRepositoryMocked);
const enderecoFactoryTest = new EnderecoFactory(enderecosRepositoryMocked);
const categoriaFactoryTest = new CategoriaFactory(categoriasRepositoryMocked);
const produtoFactoryTest = new ProdutoFactory(produtosRepositoryMocked);
const estoqueFactoryTest = new EstoqueFactory(estoquesRepositoryMocked);
const alteracaoEstoqueFactoryTest = new AlteracaoEstoqueFactory(alteracaoEstoqueRepositoryMocked);

export { clienteFactoryTest, enderecoFactoryTest, categoriaFactoryTest, produtoFactoryTest, estoqueFactoryTest, alteracaoEstoqueFactoryTest }