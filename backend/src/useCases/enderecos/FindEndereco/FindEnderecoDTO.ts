export interface IFindEnderecoRequestDTO {
    codigoEndereco: string;
}

export interface IFindEnderecoResponseDTO {
    codigoEndereco: string;
    cep: string;
    nomeRua: string;
    numeroCasa: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigoCliente: string;
}