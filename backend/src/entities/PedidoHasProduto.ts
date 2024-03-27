export class PedidoHasProduto {
    public codigoPedido: string;
    public codigoProduto: string;
    public quantidade: number;
    public valorUnitario: number;

    constructor(props: PedidoHasProduto) {
        Object.assign(this, props);
    }
}