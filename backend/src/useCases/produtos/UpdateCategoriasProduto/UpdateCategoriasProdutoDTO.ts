import { Categoria } from "../../../entities/Categoria";

export interface IUpdateCategoriasProdutoRequestDTO {
    categorias: Categoria[];
}

export interface IUpdateCategoriasProdutoResponseDTO {
    message: string;
}