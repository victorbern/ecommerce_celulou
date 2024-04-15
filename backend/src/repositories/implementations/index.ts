import { PostgresClientesRepository } from "./PostgresClientesRepository";
import { PostgresEnderecosRepository } from "./PostgresEnderecosRepository";

const postgresClientesRepository = new PostgresClientesRepository;
const postgresEnderecosRepository = new PostgresEnderecosRepository;

export { postgresClientesRepository, postgresEnderecosRepository }