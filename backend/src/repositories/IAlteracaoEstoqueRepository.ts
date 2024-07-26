import { AlteracaoEstoque } from "../entities/AlteracaoEstoque";

export interface IAlteracaoEstoqueRepository {
    save(alteracaoEstoque: AlteracaoEstoque): Promise<void>;
    getByCodigo(codigoAlteracaoEstoque: string): Promise<AlteracaoEstoque>;
    delete(codigoAlteracaoEstoque: string): Promise<void>;
}