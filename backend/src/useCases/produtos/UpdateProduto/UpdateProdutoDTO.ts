import { Categoria } from "../../../entities/Categoria";

export interface IUpdateProdutoRequestDTO {
    codigoProduto: string;
    valor: number;
    nomeProduto: string;
    marca: string;
    descricaoProduto: string;
    pesoGramas: number;
    alturaCM: number;
    larguraCM: number;
    comprimentoCM: number;
    categorias: Categoria[]
}

export interface IUpdateProdutoResponseDTO {
    message: string;
}