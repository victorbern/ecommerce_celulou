export interface IFindEnderecoByClienteRequestDTO {
    codigoCliente: string;
}

export interface IFindEnderecoByClienteResponseDTO {
    codigoEndereco: string;
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