import { Endereco } from "../entities/Endereco";

export interface IEnderecosRepository {
    getByCodigoEndereco(codigoEndereco: string): Promise<Endereco>;
    getByCodigoCliente(codigoCliente: string): Promise<Endereco[]>;
    save(endereco: Endereco): Promise<void>;
    update(endereco: Endereco): Promise<void>;
    delete(codigoEndereco: string): Promise<void>;
}