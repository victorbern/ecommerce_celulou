export class Pedido {
    public codigoPedido: string;
    public isPago: boolean;
    public formaPagamento: string;
    public parcelas: string;
    public dataPagamento: Date;
    public isEntregue: boolean;
    public dataEntrega: Date;
    public subtotal: number;
    public valorFrete: number;
    public descontoCupom: number;
    public total: number;
    
    public codigoCliente: string;
    public codigoEndereco: string;

    constructor(props: Omit<Pedido, 'codigoPedido'>, codigoPedido?: string) {
        Object.assign(this, props);
    }
}