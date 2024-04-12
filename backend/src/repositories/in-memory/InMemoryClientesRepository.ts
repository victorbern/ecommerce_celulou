import { IClientesRepository } from "../IClientesRepository";
import { Cliente } from "../../entities/Cliente";

export class InMemoryClientesRepository implements IClientesRepository {
    public items: Cliente[] = [
        {
            "codigoCliente": "Cksjskslsksls",
            "nomeCliente": "Victor",
            "cpfCliente": "25402037019",
            "celularCliente": "11964758393",
            "emailCliente": "victor@gmail.com",
            "createdAt": new Date(Date.now()),
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

    async update(cliente: Cliente): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoCliente === cliente.codigoCliente) {
                this.items[i].nomeCliente = cliente.nomeCliente;
                this.items[i].cpfCliente = cliente.cpfCliente;
                this.items[i].celularCliente = cliente.celularCliente;
                this.items[i].emailCliente = cliente.emailCliente;
            }
        }
    }

    async delete(codigoCliente: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoCliente === codigoCliente) {
                this.items.splice(i);
            }
        }
    }

}