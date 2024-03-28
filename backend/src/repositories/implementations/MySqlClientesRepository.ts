import { PrismaClient } from "@prisma/client";
import { IClientesRepository } from "../IClientesRepository";
import { Cliente } from "../../entities/Cliente";

export class MySqlClientesRepository implements IClientesRepository {
    
    getByCodigoCliente(codigoCliente: string): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    save(cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private prisma = new PrismaClient();
    
}