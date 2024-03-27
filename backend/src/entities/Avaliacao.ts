export class Avaliacao {
    public codigoAvaliacao: string;
    public titulo: string;
    public descricao: string;
    public imagensFolder: string;
    public nota: number;
    public codigoProduto: string;
    public codigoCliente: string;

    constructor(props: Omit<Avaliacao, 'codigoAvaliacao'>, codigoAvaliacao?: string) {
        Object.assign(this, props);
    }
}