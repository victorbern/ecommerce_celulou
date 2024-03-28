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
    getByCodigoCliente(codigoCliente: string): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    save(cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }


}