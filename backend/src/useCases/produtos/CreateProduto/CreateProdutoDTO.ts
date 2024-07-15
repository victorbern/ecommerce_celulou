import { Categoria } from "../../../entities/Categoria";

export interface ICreateProdutoRequestDTO {
    valor: number;
    nomeProduto: string;
    marca: string;
    descricaoProduto: string;
    pesoGramas: number;
    alturaCM: number;
    larguraCM: number;
    comprimentoCM: number;
    categorias: Categoria[];
    quantidadeEstoque: number;
}

export interface ICreateProdutoResponseDTO {
    message: string;
    codigoProduto: string;
}