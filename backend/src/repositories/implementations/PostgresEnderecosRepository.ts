import { PrismaClient } from "@prisma/client";
import { Endereco } from "../../entities/Endereco";
import { IEnderecosRepository } from "../IEnderecosRepository";

export class PostgresEnderecosRepository implements IEnderecosRepository {
    private prisma = new PrismaClient();

    async getByCodigoEndereco(codigoEndereco: string): Promise<Endereco> {
        const endereco: Endereco = await this.prisma.endereco.findUnique({
            where: {
                codigoEndereco: codigoEndereco,
            }
        });

        return endereco;
    }

    async getByCodigoCliente(codigoCliente: string): Promise<Endereco[]> {
        const enderecos: Endereco[] = await this.prisma.endereco.findMany({
            where: {
                codigoCliente: codigoCliente,
            }
        });

        return enderecos;
    }

    async save(endereco: Endereco): Promise<void> {
        await this.prisma.endereco.create({
            data: endereco,
        });
    }

    async update(endereco: Endereco): Promise<void> {
        await this.prisma.endereco.update({
            where: {
                codigoEndereco: endereco.codigoEndereco,
            },
            data: endereco,
        });
    }

    async delete(codigoEndereco: string): Promise<void> {
        await this.prisma.endereco.delete({
            where: {
                codigoEndereco: codigoEndereco,
            }
        });
    }
}