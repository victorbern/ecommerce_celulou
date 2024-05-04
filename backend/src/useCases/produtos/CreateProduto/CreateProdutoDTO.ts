export interface ICreateProdutoRequestDTO {
    valor: number;
    nomeProduto: string;
    marca: string;
    descricaoProduto: string;
    pesoGramas: number;
    alturaCM: number;
    larguraCM: number;
    comprimentoCM: number;
}

export interface ICreateProdutoResponseDTO {
    message: string;
    codigoProduto: string;
}