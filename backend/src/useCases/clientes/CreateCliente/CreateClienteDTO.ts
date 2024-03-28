export interface ICreateClienteRequestDTO {
    cpfCliente: string;
    nomeCliente: string;
    celularCliente: string;
    emailCliente: string;
    senha: string;
}

export interface ICreateClienteResponseDTO {
    message: string;
}