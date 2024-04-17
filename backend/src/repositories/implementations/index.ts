import { PostgresCategoriasRepository } from "./PostgresCategoriasRepository";
import { PostgresClientesRepository } from "./PostgresClientesRepository";
import { PostgresEnderecosRepository } from "./PostgresEnderecosRepository";

const postgresClientesRepository = new PostgresClientesRepository;
const postgresEnderecosRepository = new PostgresEnderecosRepository;
const postgresCategoriasRepository = new PostgresCategoriasRepository;

export { postgresClientesRepository, postgresEnderecosRepository, postgresCategoriasRepository }