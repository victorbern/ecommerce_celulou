import { Cliente } from "../../../entities/Cliente";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { ICreateClienteRequestDTO, ICreateClienteResponseDTO } from "./CreateClienteDTO";
import uniqid from "uniqid";
import { cpf } from "cpf-cnpj-validator";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) { }

    async execute(data: ICreateClienteRequestDTO): Promise<ICreateClienteResponseDTO> {
        let { nomeCliente, cpfCliente, celularCliente, emailCliente } = data;

        if (!cpfCliente) {
            throw new AppError("É necessário inserir um cpf!", 400);
        }

        cpfCliente = cpfCliente.replace(/[.-]/g, '');

        if (!cpf.isValid(cpfCliente)) {
            throw new AppError("O CPF é Inválido", 400);
        }

        let codigoCliente, codigoExists = null;

        do {
            codigoCliente = "C" + uniqid().slice(-11);

            codigoExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        } while (codigoExists != null);

        const createdAt = new Date(Date.now());

        const cliente = new Cliente({ codigoCliente, nomeCliente, cpfCliente, celularCliente, emailCliente, createdAt });

        let clienteExists = await this.clientesRepository.getByCpfCliente(cpfCliente);

        if (clienteExists) {
            throw new AppError("O CPF já está cadastrado", 400);
        }

        clienteExists = await this.clientesRepository.getByEmailCliente(emailCliente);

        if (clienteExists) {
            throw new AppError("O e-mail já está cadastrado", 400);
        }

        await this.clientesRepository.save(cliente);

        return { 
            message: "Cliente cadastrado com sucesso!",
            codigoCliente: codigoCliente 
        }

    }


}