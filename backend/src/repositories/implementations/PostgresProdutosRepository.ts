import { IProdutosRepository } from "../IProdutosRepository";
import { Produto } from "../../entities/Produto";
import prisma from "./prisma";

export class PostgresProdutosRepository implements IProdutosRepository {

    async getByCodigo(codigoProduto: string): Promise<Produto> {
        const result = await prisma.produto.findUnique({
            where: {
                codigoProduto: codigoProduto
            },
            include: {
                produtoHasCategoria: {
                    include: {
                        categoria: true
                    }
                }
            }
        })

        if (!result) {
            return null;
        }

        const produtoHasCategoria = result.produtoHasCategoria;

        result.produtoHasCategoria = undefined;

        const produto: Produto = {
            ...result,
            valor: result.valor.toNumber(),
            nota: result.nota ? result.nota.toNumber() : null,
            alturaCM: result.alturaCM.toNumber(),
            larguraCM: result.larguraCM.toNumber(),
            comprimentoCM: result.comprimentoCM.toNumber(),
            
            // Pega somente as informações úteis de produtoHasCategoria e renomeia para categorias
            categorias: produtoHasCategoria.map(phc => phc.categoria),
        };

        return produto;
    }

    async save(produto: Produto): Promise<void> {
        produto.categorias = undefined;
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

    async getAll(): Promise<Produto[]> {
        const result = await prisma.produto.findMany({
            include: {
                produtoHasCategoria: {
                    include: {
                        categoria: true
                    }
                }
            }
        });

        if (!result) {
            return null;
        }

        const produtos = result.map((produto) => ({
            ...produto,
            valor: produto.valor.toNumber(),
            nota: produto.nota ? produto.nota.toNumber() : null,
            alturaCM: produto.alturaCM.toNumber(),
            larguraCM: produto.larguraCM.toNumber(),
            comprimentoCM: produto.comprimentoCM.toNumber(),
            
            // Pega somente as informações úteis de produtoHasCategoria e renomeia para categorias
            categorias: produto.produtoHasCategoria.map(phc => phc.categoria),
            // Remove o nome antigo de categorias
            produtoHasCategoria: undefined
        }));
        
        return produtos;
    }

    async getByCategorias(categorias: string[]): Promise<Produto[]> {
        const result = await prisma.produto.findMany({
            where: {
                produtoHasCategoria: {
                    some: {
                        codigoCategoria: {
                            in: categorias
                        }
                    }
                }
            },
            include: {
                produtoHasCategoria: {
                    include: {
                        categoria: true
                    }
                }
            }
        });

        if (!result) {
            return null;
        }
        const produtos = result.filter(produto => {
            const codigosCategorias = produto.produtoHasCategoria.map(phc => phc.codigoCategoria);

            return categorias.every(categoria => codigosCategorias.includes(categoria))
        }).map((produto) => ({
            ...produto,
            valor: produto.valor.toNumber(),
            nota: produto.nota ? produto.nota.toNumber() : null,
            alturaCM: produto.alturaCM.toNumber(),
            larguraCM: produto.larguraCM.toNumber(),
            comprimentoCM: produto.comprimentoCM.toNumber(),
            
            // Pega somente as informações úteis de produtoHasCategoria e renomeia para categorias
            categorias: produto.produtoHasCategoria.map(phc => phc.categoria),
            // Remove o nome antigo de categorias
            produtoHasCategoria: undefined
        }));
        
        return produtos;
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
}