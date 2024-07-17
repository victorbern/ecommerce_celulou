import { PrismaClient } from "@prisma/client";
import { IClientesRepository } from "../IClientesRepository";
import { Cliente } from "../../entities/Cliente";
import prisma from "./prisma";

export class PostgresClientesRepository implements IClientesRepository {

    async getByCpfCliente(cpfCliente: string): Promise<Cliente> {
        const cliente: Cliente = await prisma.cliente.findUnique({
            where: {
                cpfCliente: cpfCliente,
            }
        });

        return cliente;
    }
    async getByEmailCliente(emailCliente: string): Promise<Cliente> {
        const cliente: Cliente = await prisma.cliente.findUnique({
            where: {
                emailCliente: emailCliente,
            },
        });

        return cliente;
    }
    
    async getByCodigoCliente(codigoCliente: string): Promise<Cliente> {
        const cliente: Cliente = await prisma.cliente.findUnique({
            where: {
                codigoCliente: codigoCliente,
            },
        });

        return cliente;
    }
    
    async save(cliente: Cliente): Promise<void> {
        await prisma.cliente.create({
            data: cliente,
        });
    }
    
    async update(cliente: Cliente): Promise<void> {
        await prisma.cliente.update({
            where: {
                codigoCliente: cliente.codigoCliente,
            },
            data: cliente,
        })
    }

    async delete(codigoCliente: string): Promise<void> {
        await prisma.cliente.delete({
            where: {
                codigoCliente: codigoCliente,
            }
        })
    }
}
