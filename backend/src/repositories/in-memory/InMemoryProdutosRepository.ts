import { Estoque, ProdutoHasCategoria } from "@prisma/client";
import { Produto } from "../../entities/Produto";
import { IProdutosRepository } from "../IProdutosRepository";
import { Categoria } from "../../entities/Categoria";

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
            isDisponivelCompra: false,
            categorias: []
        }
    ]

    public produtoHasCategoriaBanco: ProdutoHasCategoria[] = []
    public estoques: Estoque[] = [];
    public categorias: Categoria[] = [];

    setProdutoHasCategoriaBanco(produtoHasCategoriaList: ProdutoHasCategoria[]) {
        this.produtoHasCategoriaBanco = produtoHasCategoriaList;
    }

    setCategoriasBanco(categorias: Categoria[]) {
        this.categorias = categorias;
    }

    setEstoqueBanco(estoques: Estoque[]) {
        this.estoques = estoques;
    }

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

    async addCategoria(codigoCategoria: string, codigoProduto: string): Promise<void> {
        this.produtoHasCategoriaBanco.push(
            {
                codigoCategoria: codigoCategoria,
                codigoProduto: codigoProduto
            }
        )
    }

    async getByCategorias(categorias: string[]): Promise<Produto[]> {
        const produtos: Produto[] = [];

        for (let i in this.produtoHasCategoriaBanco) {
            const codigoProduto = this.produtoHasCategoriaBanco[i].codigoProduto;
            const codigoCategoria = this.produtoHasCategoriaBanco[i].codigoCategoria;
            const nomeCategoria = this.categorias.find(categoria => categoria.codigoCategoria === codigoCategoria).nomeCategoria;
            this.items.find(produto => produto.codigoProduto === codigoProduto).categorias.push({ codigoCategoria, nomeCategoria })
        }
        
        for (let i in this.items) {
            const isProdutoValido = categorias.every(codigo => {
                return this.items[i].categorias.some(categoria => categoria.codigoCategoria === codigo)
            })
            if (isProdutoValido) {
                produtos.push(this.items[i])
            }
        }

        return produtos;
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

    async updateIsVisible(codigoProduto: string, isVisible: boolean): Promise<void> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === codigoProduto) {
                this.items[i].isVisivel = isVisible;
            }
        }
    }

    async updateIsDisponivelCompra(codigoProduto: string, isDisponivelCompra: boolean): Promise<void> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === codigoProduto) {
                this.items[i].isDisponivelCompra = isDisponivelCompra;
            }
        }
    }

    async removeCategoria(codigoCategoria: string, codigoProduto: string): Promise<void> {
        for (let i = 0; i < this.produtoHasCategoriaBanco.length; i++) {
            if (this.produtoHasCategoriaBanco[i].codigoCategoria === codigoCategoria && this.produtoHasCategoriaBanco[i].codigoProduto === codigoProduto) {
                this.produtoHasCategoriaBanco.splice(i, 1);
            }
        }
    }

    async removeAllCategorias(codigoProduto: string): Promise<void> {
        for (let i = 0; i < this.produtoHasCategoriaBanco.length; i++) {
            if (this.produtoHasCategoriaBanco[i].codigoProduto === codigoProduto) {
                this.produtoHasCategoriaBanco.splice(i, 1)
            }
        }
    }

    async deleteEstoque(codigoProduto: string): Promise<void> {
        for (let i = 0; i < this.estoques.length; i++) {
            if (this.estoques[i].codigoProduto === codigoProduto) {
                this.estoques.splice(i, 1);
            }
        }
    }

    async delete(codigoProduto: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].codigoProduto === codigoProduto) {
                this.items.splice(i, 1);
            }
        }
    }
}