export interface ICreateClienteRequestDTO {
    codigoCliente: string;
    cpfCliente: string;
    nomeCliente: string;
    celularCliente: string;
    emailCliente: string;
    createdAt: Date,
    isAdmin: Boolean,
    senha: string;
}