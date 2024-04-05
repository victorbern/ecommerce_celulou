export interface IFindClienteRequestDTO {
    codigoCliente: string;
}

export interface IFindClienteResponseDTO {
    codigoCliente: string;
    nomeCliente: string;
    cpfCliente: string;
    celularCliente: string;
    emailCliente: string;
    createdAt: Date;
    isAdmin: boolean;
}