import { Categoria } from "../../../entities/Categoria";

export interface IFindAllProdutoResponseDTO {
    codigoProduto: string;
    valor: number;
    nomeProduto: string;
    marca: string;
    imagensFolder: string;
    nota: number;
    isDisponivelCompra: boolean;
    isVisivel: boolean;
    estoque: {
        codigoEstoque: string;
        quantidade: number;
    }
    categorias: Categoria[],
}