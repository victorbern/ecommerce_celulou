import { Categoria } from "../entities/Categoria";
import { IProdutoDTO } from "../entities/EntitiesDTO/ProdutoDTO";
import { Produto } from "../entities/Produto";

export interface IProdutosRepository {
    getByCodigo(codigoProduto: string): Promise<IProdutoDTO>;
    save(produto: Produto): Promise<void>;
    addCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    getAll(): Promise<IProdutoDTO[]>;
    getByCategorias(categorias: string[]): Promise<IProdutoDTO[]>;
    update(produto: Produto): Promise<void>;
    updateCategorias(categorias: Categoria[]): Promise<void>;
    updateIsVisible(codigoProduto: string, isVisible: boolean): Promise<void>;
    updateIsDisponivelCompra(codigoProduto: string, isDisponivelCompra: boolean): Promise<void>;
    removeCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    removeAllCategorias(codigoProduto: string): Promise<void>;
    deleteEstoque(codigoProduto: string): Promise<void>;
    delete(codigoProduto: string): Promise<void>;
}