export interface IFindCategoriasByProdutoRequestDTO {
    codigoProduto: string;
}

export interface IFindCategoriasByProdutoResponseDTO {
    codigoCategoria: string;
    nomeCategoria: string;
}