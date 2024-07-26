import { PrismaClient } from "@prisma/client";
import { AlteracaoEstoque } from "../../entities/AlteracaoEstoque";
import { IAlteracaoEstoqueRepository } from "../IAlteracaoEstoqueRepository";

export class PostgresAlteracaoEstoqueRepository implements IAlteracaoEstoqueRepository {
    private prisma = new PrismaClient();

    async save(alteracaoEstoque: AlteracaoEstoque): Promise<void> {
        await this.prisma.alteracoesEstoque.create({
            data: alteracaoEstoque,
        })
    }
    async getByCodigo(codigoAlteracaoEstoque: string): Promise<AlteracaoEstoque> {
        const alteracaoEstoque: AlteracaoEstoque = await this.prisma.alteracoesEstoque.findUnique({
            where: {
                codigoAlteracaoEstoque: codigoAlteracaoEstoque,
            }
        });

        return alteracaoEstoque;
    }
    async delete(codigoAlteracaoEstoque: string): Promise<void> {
        await this.prisma.alteracoesEstoque.deleteMany({
            where: {
                codigoAlteracaoEstoque: codigoAlteracaoEstoque,
            }
        })
    }
    
}