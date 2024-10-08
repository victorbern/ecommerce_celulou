import { Estoque, ProdutoHasCategoria } from "@prisma/client";
import { Produto } from "../../entities/Produto";
import { IProdutosRepository } from "../IProdutosRepository";
import { Categoria } from "../../entities/Categoria";
import { IProdutoDTO } from "../../entities/EntitiesDTO/ProdutoDTO";

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

    async getByCodigo(codigoProduto: string): Promise<IProdutoDTO> {
        for (let i in this.items) {
            if (this.items[i].codigoProduto === codigoProduto) {
                const produto: IProdutoDTO = {
                    ...this.items[i],
                    categorias: [],
                    quantidadeEstoque: null
                }
                return produto;
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

    async getAll(): Promise<IProdutoDTO[]> {
        const produtos: IProdutoDTO[] = this.items.map(produto => {
            return {
                ...produto,
                categorias: [],
                q
            }
        })
    }

    async getByCategorias(categorias: string[]): Promise<IProdutoDTO[]> {
        const produtos: IProdutoDTO[] = [];

        const produtosEncontrados = this.produtoHasCategoriaBanco.filter(phc => {
            categorias.some(codigoCategoria => {
                return phc.codigoCategoria === codigoCategoria
            })
        });

        produtosEncontrados.map(pe => {
            const isProdutoSalvo = produtos.find(p => p.codigoProduto === produto.codigoProduto);
            const produto = this.items.find(p => p.codigoProduto === pe.codigoProduto);
            const categoria = this.categorias.find(c => c.codigoCategoria === pe.codigoCategoria);
            const estoque = this.estoques.find(e => e.codigoProduto = pe.codigoProduto)
            if (!isProdutoSalvo) {
                produtos.push({
                    ...produto,
                    categorias: [
                        {
                            codigoCategoria: pe.codigoCategoria,
                            nomeCategoria: categoria.nomeCategoria
                        }
                    ],
                    quantidadeEstoque: estoque.quantidade
                })
            } else {
                produtos.find(produto => produto.codigoProduto === pe.codigoProduto).categorias.push({
                    codigoCategoria: pe.codigoCategoria,
                    nomeCategoria: categoria.nomeCategoria
                })
            }
        })
        console.log(produtos)

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

        this.produtoHasCategoriaBanco = this.produtoHasCategoriaBanco.filter(phc => phc.codigoProduto !== produto.codigoProduto)
        for (let i in produto.categorias) {
            this.produtoHasCategoriaBanco.push({
                codigoCategoria: produto.categorias[i].codigoCategoria,
                codigoProduto: produto.codigoProduto
            })
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