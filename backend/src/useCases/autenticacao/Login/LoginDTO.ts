export interface ILoginRequestDTO {
    emailCliente: string;
}

export interface ILoginResponseDTO {
    codigoCliente: string;    
    cpfCliente: string;
    nomeCliente: string;
    celularCliente: string;
    emailCliente: string;
    createdAt: Date;
}