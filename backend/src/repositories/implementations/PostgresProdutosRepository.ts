import { PrismaClient } from "@prisma/client";
import { IProdutosRepository } from "../IProdutosRepository";
import { Produto } from "../../entities/Produto";
import { Produto as ProdutoPrisma } from "@prisma/client";

export class PostgresProdutosRepository implements IProdutosRepository {
    private prisma = new PrismaClient();
    
    async getByNome(nomeProduto: string): Promise<Produto> {
        const result = await this.prisma.produto.findUnique({
            where: {
                nomeProduto: nomeProduto,
            }
        });

        if (!result) {
            return null;
        }

        let produto = this.convertToEntity(result);

        return produto;
    }

    async getByCodigo(codigoProduto: string): Promise<Produto> {
        const result = await this.prisma.produto.findUnique({
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
        await this.prisma.produto.create({
            data: produto
        })
    }

    async update(produto: Produto): Promise<void> {
        await this.prisma.produto.update({
            where: {
                codigoProduto: produto.codigoProduto,
            },
            data: produto
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