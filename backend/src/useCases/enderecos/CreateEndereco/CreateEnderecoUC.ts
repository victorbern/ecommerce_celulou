import { AppError } from "../../../errors/AppError";
import uniqid from "uniqid";
import { ICreateEnderecoRequestDTO, ICreateEnderecoResponseDTO } from "./CreateEnderecoDTO";
import { IEnderecosRepository } from "../../../repositories/IEnderecosRepository";
import { Endereco } from "../../../entities/Endereco";
import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { ClienteExistsUC } from "../../clientes/ClienteExists/ClienteExistsUC";

export class CreateEnderecoUC {
    constructor(
        private enderecosRepository: IEnderecosRepository,
        private clienteExistsUC: ClienteExistsUC
    ) {}

    async execute(data: ICreateEnderecoRequestDTO): Promise<ICreateEnderecoResponseDTO> {
        let { nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente } = data;

        // Remove os caracteres especiais do cep
        cep = cep.replace(/[.-]/g, '');

        const clienteExists = await this.clienteExistsUC.execute({codigoCliente});

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado!", HTTPStatusCode.NotFound);
        }
        
        const limiteEnderecos = await this.enderecosRepository.getByCodigoCliente(codigoCliente) 

        if (limiteEnderecos.length >= 3) {
            throw new AppError("Cada cliente só pode ter até 3 endereços cadastrados", HTTPStatusCode.BadRequest);
        }

        for (let i in limiteEnderecos) {
            if (limiteEnderecos[i].nomeEndereco === nomeEndereco) {
                throw new AppError("O nome do endereço já está cadastrado", HTTPStatusCode.Conflict)
            }
        }

        let codigoEndereco, codigoExists = null;

        do {
            codigoEndereco = "E" + uniqid().slice(-11);
            codigoExists = await this.enderecosRepository.getByCodigoEndereco(codigoEndereco);
        } while (codigoExists != null);

        const endereco = new Endereco({ codigoEndereco, nomeEndereco, cep, nomeRua, numeroCasa, complemento, bairro, cidade, estado, codigoCliente })

        await this.enderecosRepository.save(endereco);

        return { message: "Endereço cadastrado com sucesso!", codigoEndereco: codigoEndereco }
    }
}