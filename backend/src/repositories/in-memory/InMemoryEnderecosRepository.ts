import { Endereco } from "../../entities/Endereco";
import { IEnderecosRepository } from "../IEnderecosRepository";

export class InMemoryEnderecosRepository implements IEnderecosRepository {

    public items: Endereco[] = [
        {
            codigoEndereco: "EQQWWWEEERRR",
            cep: "12970000",
            nomeRua: "Rua 1",
            numeroCasa: "44B",
            complemento: "",
            bairro: "Centro",
            cidade: "Piracaia",
            estado: "São Paulo",
            codigoCliente: "C12312323123"
        }
    ]

    async getByCodigoEndereco(codigoEndereco: string): Promise<Endereco> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoEndereco === codigoEndereco) {
                return this.items[i];
            }
        }
        return null;
    }

    async getByCodigoCliente(codigoCliente: string): Promise<Endereco[]> {
        let enderecos: Endereco[] = [];

        for (let i in this.items) {
            if (this.items[i].codigoCliente === codigoCliente) {
                enderecos.push(this.items[i]);
            }
        }

        return enderecos;
    }

    async save(endereco: Endereco): Promise<void> {
        this.items.push(endereco);
    }

    async update(endereco: Endereco): Promise<void> {
        for (let i in this.items) {
            if (this.items[i].codigoEndereco == endereco.codigoEndereco) {
                this.items[i] = endereco;
            }
        }
    }

    async delete(codigoEndereco: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoEndereco == codigoEndereco) {
                this.items.splice(i);
            }
        }
    }
}