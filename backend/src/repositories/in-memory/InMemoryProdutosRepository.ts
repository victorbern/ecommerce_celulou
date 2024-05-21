import { Produto } from "../../entities/Produto";
import { IProdutosRepository } from "../IProdutosRepository";

export class InMemoryProdutosRepository implements IProdutosRepository {
    public items: Produto[] = [
        {
            codigoProduto: "PAABBBCCCDDD",
            valor: 2080.99,
            nomeProduto: "Xiaomi Redmi Note 10 Pro",
            marca: "Xioami",
            descricaoProduto: "Smartphone com X memória Y câmera",
            imagensFolder: "/produtos/PAABBBCCCDDD/",
            nota: 4.8,
            pesoGramas: 230.00,
            alturaCM: 2.8,
            larguraCM: 15.00, 
            comprimentoCM: 6.9,
            isVisivel: false,
            isDisponivelCompra: false
        }
    ]

    async getByNome(nomeProduto: string): Promise<Produto> {
        for (let i in this.items) {
            if (this.items[i].nomeProduto === nomeProduto) {
                return this.items[i];
            }
        }
        return null;
    }

    async getByCodigo(codigoProduto: string): Promise<Produto> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === codigoProduto) {
                return this.items[i];
            }
        }
        return null;
    }

    async save(produto: Produto): Promise<void> {
        this.items.push(produto);
    }

    async update(produto: Produto): Promise<void> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === produto.codigoProduto) {
                this.items[i].valor = produto.valor;
                this.items[i].nomeProduto = produto.nomeProduto;
                this.items[i].marca = produto.marca;
                this.items[i].descricaoProduto = produto.descricaoProduto;
                this.items[i].imagensFolder = produto.imagensFolder;
                this.items[i].nota = produto.nota;
                this.items[i].pesoGramas = produto.pesoGramas;
                this.items[i].alturaCM = produto.alturaCM;
                this.items[i].larguraCM = produto.larguraCM;
                this.items[i].comprimentoCM = produto.comprimentoCM;
            }
        }
    }
}