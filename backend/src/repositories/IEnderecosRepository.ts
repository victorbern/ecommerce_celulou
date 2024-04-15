import { Endereco } from "../entities/Endereco";

export interface IEnderecosRepository {
    getByCodigoEndereco(codigoEndereco: string): Promise<Endereco>;
    save(endereco: Endereco): Promise<void>;
}