import { IClientesRepository } from "../IClientesRepository";
import { Cliente } from "../../entities/Cliente";

export class InMemoryClientesRepository implements IClientesRepository {
    public items: Cliente[] = [
        {
            "codigoCliente": "Cksjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "47575127282",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "senha": "wqijwjiwjiw",
            "createdAt": new Date(Date.now()),
            "isAdmin": false
        }
    ];
    async getByCodigoCliente(codigoCliente: string): Promise<Cliente> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoCliente === codigoCliente) {
                return this.items[i];
            }
        }
        return null;
    }
    async save(cliente: Cliente): Promise<void> {
        this.items.push(cliente);
    }

    async getByCpfCliente(cpfCliente: string): Promise<Cliente> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].cpfCliente === cpfCliente) {
                return this.items[i];
            }
        }
        return null;
    }

    async getByEmailCliente(emailCliente: string): Promise<Cliente> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].emailCliente === emailCliente) {
                return this.items[i];
            }
        }
        return null;
    }

}