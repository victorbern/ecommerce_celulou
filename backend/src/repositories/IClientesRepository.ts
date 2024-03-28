import { Cliente } from "../entities/Cliente";

export interface IClientesRepository {
    getByCodigoCliente(codigoCliente: string): Promise<Cliente>;
    save(cliente: Cliente): Promise<void>;
}