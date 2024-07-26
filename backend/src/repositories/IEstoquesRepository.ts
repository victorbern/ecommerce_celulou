import { AlteracaoEstoque } from "../entities/AlteracaoEstoque";
import { Estoque } from "../entities/Estoque";

export interface IEstoquesRepository {
    save(estoque: Estoque): Promise<void>;
    getByCodigo(codigoEstoque: string): Promise<Estoque>;
    getByProduto(codigoProduto: string): Promise<Estoque>;
    alterarEstoque(codigoEstoque: string, quantidade: number): Promise<void>;
}