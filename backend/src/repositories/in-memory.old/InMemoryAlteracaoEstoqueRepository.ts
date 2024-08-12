import { AlteracaoEstoque } from "../../entities/AlteracaoEstoque";
import { IAlteracaoEstoqueRepository } from "../IAlteracaoEstoqueRepository";

export class InMemoryAlteracaoEstoqueRepository implements IAlteracaoEstoqueRepository {
    public items: AlteracaoEstoque[] = [
        {
            codigoAlteracaoEstoque: "GAABBBCCCDDD",
            valorAlteracao: 20,
            dataAlteracao: new Date(Date.now()),
            codigoEstoque: "FAABBBCCCDDD"
        }
    ]

    async save(alteracaoEstoque: AlteracaoEstoque): Promise<void> {
        this.items.push(alteracaoEstoque);
    }
    async getByCodigo(codigoAlteracaoEstoque: string): Promise<AlteracaoEstoque> {
        for (let i in this.items) {
            if (this.items[i].codigoAlteracaoEstoque === codigoAlteracaoEstoque) {
                return this.items[i];
            }
        }
        return null;
    }

    async delete(codigoAlteracaoEstoque: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoAlteracaoEstoque === codigoAlteracaoEstoque) {
                this.items.splice(i, 1);
            }
        }
    }
    
}