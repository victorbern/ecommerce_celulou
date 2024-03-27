export class Endereco {
    public codigoEndereco: string;
    public cep: string;
    public nomeRua: string;
    public numeroCasa: string;
    public complemento: string;
    public bairro: string;
    public cidade: string;
    public estado: string;
    
    public codigoCliente: string;

    constructor(props: Omit<Endereco, 'codigoEndereco'>, codigoEndereco?: string) {
        Object.assign(this, props);
    }
}