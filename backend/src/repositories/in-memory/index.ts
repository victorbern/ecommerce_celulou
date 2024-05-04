import { InMemoryCategoriasRepository } from "./InMemoryCategoriasRepository";
import { InMemoryClientesRepository } from "./InMemoryClientesRepository";
import { InMemoryEnderecosRepository } from "./InMemoryEnderecosRepository";
import { InMemoryProdutosRepository } from "./InMemoryProdutosRepository";

const inMemoryClientesRepository = new InMemoryClientesRepository;
const inMemoryEnderecosRepository = new InMemoryEnderecosRepository;
const inMemoryCategoriasRepository = new InMemoryCategoriasRepository;
const inMemoryProdutosRepository = new InMemoryProdutosRepository;

export { inMemoryClientesRepository, inMemoryEnderecosRepository, inMemoryCategoriasRepository, inMemoryProdutosRepository }