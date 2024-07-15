import { InMemoryCategoriasRepository } from "./InMemoryCategoriasRepository";
import { InMemoryClientesRepository } from "./InMemoryClientesRepository";
import { InMemoryEnderecosRepository } from "./InMemoryEnderecosRepository";
import { InMemoryEstoquesRepository } from "./InMemoryEstoquesRepository";
import { InMemoryProdutosRepository } from "./InMemoryProdutosRepository";

const inMemoryClientesRepository = new InMemoryClientesRepository;
const inMemoryEnderecosRepository = new InMemoryEnderecosRepository;
const inMemoryCategoriasRepository = new InMemoryCategoriasRepository;
const inMemoryProdutosRepository = new InMemoryProdutosRepository;
const inMemoryEstoquesRepository = new InMemoryEstoquesRepository;

export { inMemoryClientesRepository, inMemoryEnderecosRepository, inMemoryCategoriasRepository, inMemoryProdutosRepository, inMemoryEstoquesRepository }