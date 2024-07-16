import { Estoque } from "../../entities/Estoque";
import { IEstoquesRepository } from "../IEstoquesRepository";

export class InMemoryEstoquesRepository implements IEstoquesRepository {
    public items: Estoque[] = [
        {
            codigoEstoque: "FAABBBCCCDDD",
            quantidade: 0,
            codigoProduto: "PAABBBCCCDDD"
        }
    ]

    async save(estoque: Estoque): Promise<void> {
        this.items.push(estoque);
    }

    async getByCodigo(codigoEstoque: string): Promise<Estoque> {
        for (let i in this.items) {
            if (this.items[i].codigoEstoque === codigoEstoque) {
                return this.items[i];
            }
        }
        return null;
    }

    async getByProduto(codigoProduto: string): Promise<Estoque> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === codigoProduto) {
                return this.items[i];
            }
        }

        return null;
    }
}