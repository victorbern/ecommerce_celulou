export interface IUpdateIsDisponivelProdutoRequestDTO {
    codigoProduto: string;
    isDisponivelCompra: boolean;
}

export interface IUpdateIsDisponivelProdutoResponseDTO {
    message: string;
}