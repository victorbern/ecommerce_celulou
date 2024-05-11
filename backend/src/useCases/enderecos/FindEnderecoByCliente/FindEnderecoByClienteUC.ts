import { AppError } from "../../../errors/AppError";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";
import { IFindEnderecoByClienteRequestDTO, IFindEnderecoByClienteResponseDTO } from "./FindEnderecoByClienteDTO";

export class FindEnderecoByClienteUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
        private findClienteUC: FindClienteUC,
    ) {}

    async execute(data: IFindEnderecoByClienteRequestDTO): Promise<IFindEnderecoByClienteResponseDTO[]> {
        const { codigoCliente } = data;

        const clienteExists = await this.findClienteUC.execute({ codigoCliente });

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", 404);
        }

        let enderecos = await this.enderecosRepository.getByCodigoCliente(codigoCliente);
        let result: IFindEnderecoByClienteResponseDTO[] = [];

        for (let i in enderecos) {
            result.push({
                codigoEndereco: enderecos[i].codigoEndereco,
                nomeEndereco: enderecos[i].nomeEndereco,
                cep: enderecos[i].cep,
                nomeRua: enderecos[i].nomeRua,
                numeroCasa: enderecos[i].numeroCasa,
                complemento: enderecos[i].complemento,
                bairro: enderecos[i].bairro,
                cidade: enderecos[i].cidade,
                estado: enderecos[i].estado,
                codigoCliente: enderecos[i].codigoCliente
            })
        }

        return result;
    }
}