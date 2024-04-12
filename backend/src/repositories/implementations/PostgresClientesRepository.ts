import { PrismaClient } from "@prisma/client";
import { IClientesRepository } from "../IClientesRepository";
import { Cliente } from "../../entities/Cliente";

export class PostgresClientesRepository implements IClientesRepository {
    private prisma = new PrismaClient();

    async getByCpfCliente(cpfCliente: string): Promise<Cliente> {
        const cliente: Cliente = await this.prisma.cliente.findUnique({
            where: {
                cpfCliente: cpfCliente,
            }
        });

        return cliente;
    }
    async getByEmailCliente(emailCliente: string): Promise<Cliente> {
        const cliente: Cliente = await this.prisma.cliente.findUnique({
            where: {
                emailCliente: emailCliente,
            },
        });

        return cliente;
    }
    
    async getByCodigoCliente(codigoCliente: string): Promise<Cliente> {
        const cliente: Cliente = await this.prisma.cliente.findUnique({
            where: {
                codigoCliente: codigoCliente,
            },
        });

        return cliente;
    }
    
    async save(cliente: Cliente): Promise<void> {
        await this.prisma.cliente.create({
            data: cliente,
        });
    }
    
    async update(cliente: Cliente): Promise<void> {
        await this.prisma.cliente.update({
            where: {
                codigoCliente: cliente.codigoCliente,
            },
            data: cliente,
        })
    }

    async delete(codigoCliente: string): Promise<void> {
        await this.prisma.cliente.delete({
            where: {
                codigoCliente: codigoCliente,
            }
        })
    }
}
