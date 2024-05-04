import { PostgresCategoriasRepository } from "./PostgresCategoriasRepository";
import { PostgresClientesRepository } from "./PostgresClientesRepository";
import { PostgresEnderecosRepository } from "./PostgresEnderecosRepository";
import { PostgresProdutosRepository } from "./PostgresProdutosRepository";

const postgresClientesRepository = new PostgresClientesRepository;
const postgresEnderecosRepository = new PostgresEnderecosRepository;
const postgresCategoriasRepository = new PostgresCategoriasRepository;
const postgresProdutosRepository = new PostgresProdutosRepository;

export { postgresClientesRepository, postgresEnderecosRepository, postgresCategoriasRepository, postgresProdutosRepository }