import { Cliente } from "../entities/Cliente";

export interface IClientesRepository {
    getByCodigoCliente(codigoCliente: string): Promise<Cliente>;
    save(cliente: Cliente): Promise<void>;
    getByCpfCliente(cpfCliente: string): Promise<Cliente>;
    getByEmailCliente(emailCliente: string): Promise<Cliente>;
    update(cliente: Cliente): Promise<void>;
}

