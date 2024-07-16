export interface IFindEstoqueRequestDTO {
    codigoEstoque: string;
}

export interface IFindEstoqueResponseDTO {
    codigoEstoque: string;
    quantidade: number;
    codigoProduto: string;
}