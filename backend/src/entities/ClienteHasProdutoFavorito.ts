export class ClienteHasProdutoFavorito {
    public codigoProduto: string;
    public codigoCliente: string;

    constructor(props: ClienteHasProdutoFavorito) {
        Object.assign(this, props);
    }
}