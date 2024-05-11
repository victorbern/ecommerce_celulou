export interface ICreateEnderecoRequestDTO {
    nomeEndereco: string;
    cep: string;
    nomeRua: string;
    numeroCasa: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;

    codigoCliente: string;
}

export interface ICreateEnderecoResponseDTO {
    message: string;
}