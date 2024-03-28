export interface IDecriptarSenhaRequestDTO {
    senha: string;
    hash: string;
}

export interface IDecriptarSenhaResponseDTO {
    result: boolean;
}