export interface IUpdateClienteRequestDTO {
    codigoCliente: string;
    cpfCliente: string;
    nomeCliente: string;
    celularCliente: string;
    emailCliente: string;
}

export interface IUpdateClienteResponseDTO {
    message: string;
}