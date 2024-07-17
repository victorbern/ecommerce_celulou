import { PrismaClient } from "@prisma/client";
import { Endereco } from "../../entities/Endereco";
import { IEnderecosRepository } from "../IEnderecosRepository";
import prisma from "./prisma";

export class PostgresEnderecosRepository implements IEnderecosRepository {

    async getByCodigoEndereco(codigoEndereco: string): Promise<Endereco> {
        const endereco: Endereco = await prisma.endereco.findUnique({
            where: {
                codigoEndereco: codigoEndereco,
            }
        });

        return endereco;
    }

    async getByCodigoCliente(codigoCliente: string): Promise<Endereco[]> {
        const enderecos: Endereco[] = await prisma.endereco.findMany({
            where: {
                codigoCliente: codigoCliente,
            }
        });

        return enderecos;
    }

    async save(endereco: Endereco): Promise<void> {
        await prisma.endereco.create({
            data: endereco,
        });
    }

    async update(endereco: Endereco): Promise<void> {
        await prisma.endereco.update({
            where: {
                codigoEndereco: endereco.codigoEndereco,
            },
            data: endereco,
        });
    }

    async delete(codigoEndereco: string): Promise<void> {
        await prisma.endereco.delete({
            where: {
                codigoEndereco: codigoEndereco,
            }
        });
    }
}