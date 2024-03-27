export class Categoria {
    public codigoCategoria: string;
    public nomeCategoria: string;

    constructor(props: Omit<Categoria, 'codigoCategoria'>, codigoCategoria?: string) {
        Object.assign(this, props);
    }
}