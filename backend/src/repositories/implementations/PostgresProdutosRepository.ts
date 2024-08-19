import { IProdutosRepository } from "../IProdutosRepository";
import { Produto } from "../../entities/Produto";
import prisma from "./prisma";
import { ProdutoHasCategoria } from "@prisma/client";
import { Categoria } from "../../entities/Categoria";
import { IProdutoDTO } from "../../entities/EntitiesDTO/ProdutoDTO";

export class PostgresProdutosRepository implements IProdutosRepository {
    updateCategorias(categorias: Categoria[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getByCodigo(codigoProduto: string): Promise<IProdutoDTO> {
        const result = await prisma.produto.findUnique({
            where: {
                codigoProduto: codigoProduto
            },
            include: {
                produtoHasCategoria: {
                    include: {
                        categoria: true
                    }
                },
                estoque: true
            }
        })

        if (!result) {
            return null;
        }

        const produtoHasCategoria = result.produtoHasCategoria;
        const estoque = result.estoque;

        result.produtoHasCategoria = undefined;
        result.estoque = undefined;

        const produto: IProdutoDTO = {
            ...result,
            valor: result.valor.toNumber(),
            nota: result.nota ? result.nota.toNumber() : null,
            alturaCM: result.alturaCM.toNumber(),
            larguraCM: result.larguraCM.toNumber(),
            comprimentoCM: result.comprimentoCM.toNumber(),

            // Pega somente as informações úteis de produtoHasCategoria e renomeia para categorias
            categorias: produtoHasCategoria.map(phc => phc.categoria),

            // Pega somente a quantidade do estoque em estoque
            quantidadeEstoque: estoque ? estoque.quantidade : 0  
        };

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

    async getAll(): Promise<IProdutoDTO[]> {
        const result = await prisma.produto.findMany({
            include: {
                produtoHasCategoria: {
                    include: {
                        categoria: true
                    }
                },
                estoque: true
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
            produtoHasCategoria: undefined,
            // Pega a quantidade de estoque do produto
            quantidadeEstoque: produto.estoque.quantidade,
            // Remove o atributo estoque
            estoque: undefined
        }));

        return produtos;
    }

    async getByCategorias(categorias: string[]): Promise<IProdutoDTO[]> {
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
                },
                estoque: true
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
            produtoHasCategoria: undefined,
            // Pega a quantidade do estoque
            quantidadeEstoque: produto.estoque.quantidade,  
            // Remove o atributo estoque
            estoque: undefined
        }));

        return produtos;
    }

    async update(produto: IProdutoDTO): Promise<void> {
        const codigosCategoria = produto.categorias ? produto.categorias.map(phc => { return phc.codigoCategoria }) : null;
        prisma.$transaction(async (prisma) => {
            produto.categorias = undefined;
            produto.quantidadeEstoque = undefined;
            await prisma.produto.update({
                where: {
                    codigoProduto: produto.codigoProduto,
                },
                data: produto
            })

            await prisma.produtoHasCategoria.deleteMany({
                where: {
                    codigoProduto: produto.codigoProduto
                }
            })
            
            if (codigosCategoria && codigosCategoria.length > 0) {
                const promises = codigosCategoria.map(async (codigoCategoria) => {
                    await prisma.produtoHasCategoria.create({
                        data: {
                            codigoCategoria: codigoCategoria,
                            codigoProduto: produto.codigoProduto
                        }
                    })
                });


                await Promise.all(promises);
            }

        })
    }

    async updateIsVisivel(codigoProduto: string, isVisivel: boolean) {
        await prisma.produto.update({
            where: {
                codigoProduto: codigoProduto,
            },
            data: {
                isVisivel,
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