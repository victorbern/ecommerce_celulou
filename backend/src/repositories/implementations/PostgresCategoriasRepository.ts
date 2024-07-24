import { ProdutoHasCategoria } from "@prisma/client";
import { Categoria } from "../../entities/Categoria";
import { ICategoriasRepository } from "../ICategoriasRepository";
import prisma from "./prisma";

export class PostgresCategoriasRepository implements ICategoriasRepository {

    async getByName(nomeCategoria: string): Promise<Categoria> {
        const categoria: Categoria = await prisma.categoria.findUnique({
            where: {
                nomeCategoria: nomeCategoria
            }
        });

        return categoria;
    }

    async getByCodigo(codigoCategoria: string): Promise<Categoria> {
        const categoria: Categoria = await prisma.categoria.findUnique({
            where: {
                codigoCategoria: codigoCategoria,
            }
        });

        return categoria;
    }

    async getByCodigoProduto(codigoProduto: string): Promise<Categoria[]> {
        const produtoHasCategoriaList: ProdutoHasCategoria[] = await prisma.produtoHasCategoria.findMany({
            where: {
                codigoProduto: codigoProduto,
            }
        })

        const categorias: Categoria[] = [];
        for (let i in produtoHasCategoriaList) {
            const categoria: Categoria = await prisma.categoria.findUnique({
                where: {
                    codigoCategoria: produtoHasCategoriaList[i].codigoCategoria,
                }
            })

            categorias.push(categoria);
        }

        return categorias;
    }

    async save(categoria: Categoria): Promise<void> {
        await prisma.categoria.create({
            data: categoria,
        });
    }

    async getAll(): Promise<Categoria[]> {
        let categorias: Categoria[] = await prisma.categoria.findMany();

        return categorias;
    }

    async getAllWithFilter(filtro: string): Promise<Categoria[]> {
        let categorias: Categoria[] = await prisma.categoria.findMany({
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
        await prisma.categoria.update({
            where: {
                codigoCategoria: categoria.codigoCategoria
            },
            data: categoria,
        })
    }

    async delete(codigoCategoria: string): Promise<void> {
        await prisma.produtoHasCategoria.deleteMany({
            where: {
                codigoCategoria: codigoCategoria,
            }
        })

        await prisma.categoria.delete({
            where: {
                codigoCategoria: codigoCategoria
            }
        });
    }
}