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
}

export interface IUpdateProdutoResponseDTO {
    message: string;
}