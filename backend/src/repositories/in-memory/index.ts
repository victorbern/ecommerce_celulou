import { InMemoryClientesRepository } from "./InMemoryClientesRepository";
import { InMemoryEnderecosRepository } from "./InMemoryEnderecosRepository";

const inMemoryClientesRepository = new InMemoryClientesRepository;
const inMemoryEnderecosRepository = new InMemoryEnderecosRepository;

export { inMemoryClientesRepository, inMemoryEnderecosRepository }