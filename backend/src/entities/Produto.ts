export class Produto {
    public codigoProduto: string;
    public valor: number;
    public nomeProduto: string;
    public marca: string;
    public descricaoProduto: string;
    public imagensFolder: string;
    public nota: number;
    public peso: number;
    public medidasLAC: string;

    constructor(props: Omit<Produto, 'codigoProduto'>, codigoProduto?: string) {
        Object.assign(this, props);
    }
}