export class Estoque {
    public codigoEstoque: string;
    public quantidade: number;
    public codigoProduto: string;

    constructor(props: Omit<Estoque, 'codigoEstoque'>, codigoEstoque?: string) {
        Object.assign(this, props);
    }
}