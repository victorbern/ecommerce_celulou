import { Categoria } from "../entities/Categoria";

export interface ICategoriasRepository {
    getByName(nomeCategoria: string): Promise<Categoria>;
    getByCodigo(codigoCategoria: string): Promise<Categoria>;
    save(categoria: Categoria): Promise<void>;
}