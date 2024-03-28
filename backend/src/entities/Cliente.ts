export class Cliente {
    public codigoCliente: string;
    public cpfCliente: string;
    public nomeCliente: string;
    public celularCliente: string;
    public emailCliente: string;
    public senha: string;
    public createdAt: Date;
    public isAdmin: Boolean;

    constructor(props: Omit<Cliente, 'codigoCliente'>, codigoCliente?: string) {
        Object.assign(this, props);
    }

    
}