import { PrismaClient } from "@prisma/client";
import { Categoria } from "../../entities/Categoria";
import { ICategoriasRepository } from "../ICategoriasRepository";

export class PostgresCategoriasRepository implements ICategoriasRepository {
    private prisma = new PrismaClient();

    async getByName(nomeCategoria: string): Promise<Categoria> {
        const categoria: Categoria = await this.prisma.categoria.findUnique({
            where: {
                nomeCategoria: nomeCategoria
            }
        });

        return categoria;
    }

    async getByCodigo(codigoCategoria: string): Promise<Categoria> {
        const categoria: Categoria = await this.prisma.categoria.findUnique({
            where: {
                codigoCategoria: codigoCategoria,
            }
        });

        return categoria;
    }

    async save(categoria: Categoria): Promise<void> {
        await this.prisma.categoria.create({
            data: categoria,
        });
    }

    async getAll(): Promise<Categoria[]> {
        let categorias: Categoria[] = await this.prisma.categoria.findMany();

        return categorias;
    }

    async getAllWithFilter(filtro: string): Promise<Categoria[]> {
        let categorias: Categoria[] = await this.prisma.categoria.findMany({
            where: {
                nomeCategoria: {
                    contains: filtro,
                    mode: "insensitive"
                }
            }
        });

        return categorias;
    }
    
    async update(categoria: Categoria): Promise<void> {
        await this.prisma.categoria.update({
            where: {
                codigoCategoria: categoria.codigoCategoria
            },
            data: categoria,
        })
    }
}