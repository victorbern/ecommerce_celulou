export class AlteracaoEstoque {
    public codigoAlteracaoEstoque: string;
    public valorAlteracao: number;
    public dataAlteracao: Date;

    public codigoEstoque: string;

    constructor(props: Omit<AlteracaoEstoque, 'codigoAlteracaoEstoque'>, codigoAlteracaoEstoque?: string) {
        Object.assign(this, props);
    }
}