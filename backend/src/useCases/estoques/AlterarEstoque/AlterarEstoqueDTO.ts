export interface IAlterarEstoqueRequestDTO {
    codigoProduto: string;
    valorAlteracao: number;
}

export interface IAlterarEstoqueResponseDTO {
    message: string;
    codigoEstoque: string;
    quantidade: number;
    codigoProduto: string;
}