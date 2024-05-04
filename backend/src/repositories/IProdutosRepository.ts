import { Produto } from "../entities/Produto";

export interface IProdutosRepository {
    getByNome(nomeProduto: string): Promise<Produto>;
    getByCodigo(codigoProduto: string): Promise<Produto>;
    save(produto: Produto): Promise<void>;
}