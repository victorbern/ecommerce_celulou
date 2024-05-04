export interface IFindProdutoRequestDTO {
    codigoProduto: string;
}

export interface IFindProdutoResponseDTO {
    codigoProduto: string;
    valor: number;
    nomeProduto: string;
    marca: string;
    descricaoProduto: string;
    imagensFolder: string;
    nota: number;
    pesoGramas: number;
    alturaCM: number;
    larguraCM: number;
    comprimentoCM: number;
    isDisponivelCompra: boolean;
    isVisivel: boolean;
}