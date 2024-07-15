export interface ICreateEstoqueRequestDTO {
    quantidade: number;
    codigoProduto: string
}

export interface ICreateEstoqueResponseDTO {
    message: string;
    codigoEstoque: string;
}