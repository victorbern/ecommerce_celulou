import { Produto } from "../entities/Produto";

export interface IProdutosRepository {
    getByNome(nomeProduto: string): Promise<Produto>;
    getByCodigo(codigoProduto: string): Promise<Produto>;
    save(produto: Produto): Promise<void>;
    addCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    removeCategoria(codigoCategoria: string, codigoProduto: string): Promise<void>;
    update(produto: Produto): Promise<void>;
    updateIsVisible(codigoProduto: string, isVisible: boolean): Promise<void>;
    updateIsDisponivelCompra(codigoProduto: string, isDisponivelCompra: boolean): Promise<void>;
}