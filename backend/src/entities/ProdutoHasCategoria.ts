export class ProdutoHasCategoria {
    public codigoProduto: string;
    public codigoCategoria: string;

    constructor(props: ProdutoHasCategoria) {
        Object.assign(this, props);
    }
}