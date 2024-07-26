export interface ICreateAlteracaoEstoqueRequestDTO {
    valorAlteracao: number;
    codigoEstoque: string;
}

export interface ICreateAlteracaoEstoqueResponseDTO {
    message: string;
    codigoAlteracaoEstoque: string;
}