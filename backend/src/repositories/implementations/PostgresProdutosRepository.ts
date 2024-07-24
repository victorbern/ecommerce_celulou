import { PrismaClient } from "@prisma/client";
import { IProdutosRepository } from "../IProdutosRepository";
import { Produto } from "../../entities/Produto";
import { Produto as ProdutoPrisma } from "@prisma/client";
import prisma from "./prisma";

export class PostgresProdutosRepository implements IProdutosRepository {

    async getByCodigo(codigoProduto: string): Promise<Produto> {
        const result = await prisma.produto.findUnique({
            where: {
                codigoProduto: codigoProduto
            }
        })

        if (!result) {
            return null;
        }

        let produto = this.convertToEntity(result);

        return produto;
    }

    async save(produto: Produto): Promise<void> {
        await prisma.produto.create({
            data: produto
        })
    }

    async addCategoria(codigoCategoria: string, codigoProduto: string): Promise<void> {
        await prisma.produtoHasCategoria.create({
            data: {
                codigoCategoria: codigoCategoria,
                codigoProduto: codigoProduto
            }
        })
    }

    async update(produto: Produto): Promise<void> {
        await prisma.produto.update({
            where: {
                codigoProduto: produto.codigoProduto,
            },
            data: produto
        })
    }

    async updateIsVisible(codigoProduto: string, isVisible: boolean) {
        await prisma.produto.update({
            where: {
                codigoProduto: codigoProduto,
            },
            data: {
                isVisivel: isVisible,
            }
        });
    }

    async updateIsDisponivelCompra(codigoProduto: string, isDisponivelCompra: boolean): Promise<void> {
        await prisma.produto.update({
            where: {
                codigoProduto: codigoProduto,
            },
            data: {
                isDisponivelCompra: isDisponivelCompra,
            }
        });
    }

    async removeCategoria(codigoCategoria: string, codigoProduto: string): Promise<void> {
        await prisma.produtoHasCategoria.delete({
            where: {
                codigoProduto_codigoCategoria: {
                    codigoCategoria: codigoCategoria,
                    codigoProduto: codigoProduto
                }
            }
        })
    }

    async removeAllCategorias(codigoProduto: string): Promise<void> {
        await prisma.produtoHasCategoria.deleteMany({
            where: {
                codigoProduto: codigoProduto
            }
        })
    }

    async deleteEstoque(codigoProduto: string): Promise<void> {
        await prisma.estoque.deleteMany({
            where: {
                codigoProduto: codigoProduto,
            }
        })
    }

    async delete(codigoProduto: string): Promise<void> {
        await prisma.produto.deleteMany({
            where: {
                codigoProduto: codigoProduto
            },
        })
    }

    convertToEntity(produto: ProdutoPrisma): Produto {
        let result: Produto = {
            codigoProduto: produto.codigoProduto,
            valor: produto.valor.toNumber(),
            nomeProduto: produto.nomeProduto,
            marca: produto.marca,
            descricaoProduto: produto.descricaoProduto,
            imagensFolder: produto.imagensFolder,
            nota: produto.nota ? produto.nota.toNumber() : null,
            pesoGramas: produto.pesoGramas,
            alturaCM: produto.alturaCM.toNumber(),
            larguraCM: produto.larguraCM.toNumber(),
            comprimentoCM: produto.comprimentoCM.toNumber(),
            isDisponivelCompra: produto.isDisponivelCompra,
            isVisivel: produto.isVisivel
        }

        return result;
    }
}