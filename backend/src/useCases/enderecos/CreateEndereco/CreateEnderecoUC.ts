import { AppError } from "../../../errors/AppError";
import uniqid from "uniqid";
import { ICreateEnderecoRequestDTO, ICreateEnderecoResponseDTO } from "./CreateEnderecoDTO";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { Endereco } from "../../../entities/Endereco";
import { FindClienteUC } from "../../clientes/FindCliente/FindClienteUC";

export class CreateEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
        private findClienteUC: FindClienteUC
    ) {}

    async execute(data: ICreateEnderecoRequestDTO): Promise<ICreateEnderecoResponseDTO> {
        let { cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente } = data;

        // Remove os caracteres especiais do cep
        cep = cep.replace(/[.-]/g, '');

        const clienteExists = await this.findClienteUC.execute({codigoCliente});

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", 404);
        }

        let codigoEndereco, codigoExists = null;

        do {
            codigoEndereco = "E" + uniqid().slice(-11);
            codigoExists = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);
        } while (codigoExists != null);

        const endereco = new Endereco({ codigoEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente })

        await this.enderecosRepository.save(endereco);

        return { message: "Endereço cadastrado com sucesso!" }
    }
}