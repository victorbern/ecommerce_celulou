import { Categoria } from "../entities/Categoria";

export interface ICategoriasRepository {
    getByName(nomeCategoria: string): Promise<Categoria>;
    getAll(): Promise<Categoria[]>;
    getAllWithFilter(filtro: string): Promise<Categoria[]>;
    getByCodigo(codigoCategoria: string): Promise<Categoria>;
    save(categoria: Categoria): Promise<void>;
}