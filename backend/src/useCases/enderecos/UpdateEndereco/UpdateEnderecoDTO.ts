export interface IUpdateEnderecoRequestDTO {
    codigoEndereco: string;
    cep: string;
    nomeRua: string;
    numeroCasa: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export interface IUpdateEnderecoResponseDTO {
    message: string;
}