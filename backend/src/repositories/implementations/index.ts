import { PostgresAlteracaoEstoqueRepository } from "./PostgresAlteracaoEstoqueRepository";
import { PostgresCategoriasRepository } from "./PostgresCategoriasRepository";
import { PostgresClientesRepository } from "./PostgresClientesRepository";
import { PostgresEnderecosRepository } from "./PostgresEnderecosRepository";
import { PostgresEstoquesRepository } from "./PostgresEstoquesRepository";
import { PostgresProdutosRepository } from "./PostgresProdutosRepository";

const postgresClientesRepository = new PostgresClientesRepository;
const postgresEnderecosRepository = new PostgresEnderecosRepository;
const postgresCategoriasRepository = new PostgresCategoriasRepository;
const postgresProdutosRepository = new PostgresProdutosRepository;
const postgresEstoquesRepository = new PostgresEstoquesRepository;
const postgresAlteracaoEstoqueRepository = new PostgresAlteracaoEstoqueRepository;

export { postgresClientesRepository, postgresEnderecosRepository, postgresCategoriasRepository, postgresProdutosRepository, postgresEstoquesRepository, postgresAlteracaoEstoqueRepository }