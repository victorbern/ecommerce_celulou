import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export interface IProdutosRepository {
    getByCodigo(codigoProduto: string): Promise<Produto>;
    save(produto: Produto): Promise<void>;
    addCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    getAll(): Promise<Produto[]>;
    getByCategorias(categorias: string[]): Promise<Produto[]>;
    update(produto: Produto): Promise<void>;
    updateIsVisible(codigoProduto: string, isVisible: boolean): Promise<void>;
    updateIsDisponivelCompra(codigoProduto: string, isDisponivelCompra: boolean): Promise<void>;
    removeCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    removeAllCategorias(codigoProduto: string): Promise<void>;
    deleteEstoque(codigoProduto: string): Promise<void>;
    delete(codigoProduto: string): Promise<void>;
}