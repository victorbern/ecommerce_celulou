import { InMemoryCategoriasRepository } from "./InMemoryCategoriasRepository";
import { InMemoryClientesRepository } from "./InMemoryClientesRepository";
import { InMemoryEnderecosRepository } from "./InMemoryEnderecosRepository";

const inMemoryClientesRepository = new InMemoryClientesRepository;
const inMemoryEnderecosRepository = new InMemoryEnderecosRepository;
const inMemoryCategoriasRepository = new InMemoryCategoriasRepository;

export { inMemoryClientesRepository, inMemoryEnderecosRepository, inMemoryCategoriasRepository }