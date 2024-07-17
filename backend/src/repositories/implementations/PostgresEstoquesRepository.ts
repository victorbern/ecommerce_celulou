import { PrismaClient } from "@prisma/client";
import { Estoque } from "../../entities/Estoque";
import { IEstoquesRepository } from "../IEstoquesRepository";
import prisma from "./prisma";

export class PostgresEstoquesRepository implements IEstoquesRepository {

    async save(estoque: Estoque): Promise<void> {
        await prisma.estoque.create({
            data: estoque
        })
    }

    async getByCodigo(codigoEstoque: string): Promise<Estoque> {
        const estoque: Estoque = await prisma.estoque.findUnique({
            where: {
                codigoEstoque: codigoEstoque
            }
        });
        
        return estoque;
    }

    async getByProduto(codigoProduto: string): Promise<Estoque> {
        const estoque: Estoque = await prisma.estoque.findUnique({
            where: {
                codigoProduto: codigoProduto
            }
        });

        return estoque;
    }
}