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
    async save(endereco: Endereco): Promise<void> {
        await this.prisma.endereco.create({
            data: endereco,
        });
    }
}