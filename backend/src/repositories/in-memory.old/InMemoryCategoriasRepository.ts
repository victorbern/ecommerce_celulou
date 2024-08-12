import { ProdutoHasCategoria } from "@prisma/client";
import { Categoria } from "../../entities/Categoria";
import { ICategoriasRepository } from "../ICategoriasRepository";

export class InMemoryCategoriasRepository implements ICategoriasRepository {
    public items: Categoria[] = [
        {
            codigoCategoria: "TASAAASSSDDD",
            nomeCategoria: "Intermediario"
        }
    ]

    private produtoHasCategoriaBanco: ProdutoHasCategoria[] = []

    setProdutoHasCategoriaBanco(produtoHasCategoriaList: ProdutoHasCategoria[]) {
        this.produtoHasCategoriaBanco = produtoHasCategoriaList;
    }

    async getByName(nomeCategoria: string): Promise<Categoria> {
        for (let i in this.items) {
            if (this.items[i].nomeCategoria == nomeCategoria) {
                return this.items[i];
            }
        }
    }

    async getByCodigo(codigoCategoria: string): Promise<Categoria> {
        for (let i in this.items) {
            if (this.items[i].codigoCategoria == codigoCategoria) {
                return this.items[i];
            }
        }
    }

    async getByCodigoProduto(codigoProduto: string): Promise<Categoria[]> {
        const produtoHasCategoriaList: ProdutoHasCategoria[] = [];

        for (let i in this.produtoHasCategoriaBanco) {
            if (this.produtoHasCategoriaBanco[i].codigoProduto === codigoProduto) {
                produtoHasCategoriaList.push(this.produtoHasCategoriaBanco[i])
            }
        }

        const categorias: Categoria[] = [];

        for (let i in produtoHasCategoriaList) {
            for (let j in this.items) {
                if (produtoHasCategoriaList[i].codigoCategoria == this.items[j].codigoCategoria) {
                    categorias.push(this.items[j]);
                }
            }
        }
        
        return categorias;
    }

    async save(categoria: Categoria): Promise<void> {
        this.items.push(categoria);
    }

    async getAll(): Promise<Categoria[]> {
        return this.items;
    }

    async getAllWithFilter(filtro: string): Promise<Categoria[]> {
        let result: Categoria[] = [];
        for (let i in this.items) {
            if (this.items[i].nomeCategoria.includes(filtro)) {
                result.push(this.items[i]);
            }
        }
        return result;
    }

    async update(categoria: Categoria): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoCategoria == categoria.codigoCategoria) {
                this.items[i] = categoria;
            }
        }
    }

    async delete(codigoCategoria: string): Promise<void> {
        for (let i = 0; i < this.produtoHasCategoriaBanco.length; i++) {
            if (this.produtoHasCategoriaBanco[i].codigoCategoria === codigoCategoria) {
                this.produtoHasCategoriaBanco.splice(i, 1);
            }
        }

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoCategoria === codigoCategoria) {
                this.items.splice(i, 1);
            }
        }
    }
    
}