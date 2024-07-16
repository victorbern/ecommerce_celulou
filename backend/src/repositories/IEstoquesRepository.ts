import { Estoque } from "../entities/Estoque";

export interface IEstoquesRepository {
    save(estoque: Estoque): Promise<void>;
    getByCodigo(codigoEstoque: string): Promise<Estoque>;
    getByProduto(codigoProduto: string): Promise<Estoque>;
}