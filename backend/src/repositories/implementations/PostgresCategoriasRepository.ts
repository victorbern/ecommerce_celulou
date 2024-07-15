import { PrismaClient, ProdutoHasCategoria } from "@prisma/client";
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

    async getByCodigoProduto(codigoProduto: string): Promise<Categoria[]> {
        const produtoHasCategoriaList: ProdutoHasCategoria[] = await this.prisma.produtoHasCategoria.findMany({
            where: {
                codigoProduto: codigoProduto,
            }
        })

        const categorias: Categoria[] = [];
        for (let i in produtoHasCategoriaList) {
            const categoria: Categoria = await this.prisma.categoria.findUnique({
                where: {
                    codigoCategoria: produtoHasCategoriaList[i].codigoCategoria,
                }
            })

            categorias.push(categoria);
        }

        return categorias;
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

    async delete(codigoCategoria: string): Promise<void> {
        await this.prisma.produtoHasCategoria.deleteMany({
            where: {
                codigoCategoria: codigoCategoria,
            }
        })

        await this.prisma.categoria.delete({
            where: {
                codigoCategoria: codigoCategoria
            }
        });
    }
}