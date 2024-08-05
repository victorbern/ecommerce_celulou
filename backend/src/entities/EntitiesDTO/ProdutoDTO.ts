import { Categoria } from "../Categoria";
import { Produto } from "../Produto";

export interface IProdutoDTO extends Produto {
    categorias: Categoria[],
    quantidadeEstoque: number;
}