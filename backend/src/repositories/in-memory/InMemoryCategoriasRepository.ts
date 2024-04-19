import { Categoria } from "../../entities/Categoria";
import { ICategoriasRepository } from "../ICategoriasRepository";

export class InMemoryCategoriasRepository implements ICategoriasRepository {
    public items: Categoria[] = [
        {
            codigoCategoria: "TASAAASSSDDD",
            nomeCategoria: "Intermediario"
        }
    ]

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
    
}