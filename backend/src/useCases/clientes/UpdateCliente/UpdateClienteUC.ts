import { ZodError } from "zod";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { AppError } from "../../../errors/AppError";
import { IUpdateClienteRequestDTO, IUpdateClienteResponseDTO } from "./UpdateClienteDTO";
import { cpf } from "cpf-cnpj-validator";
import { Cliente } from "../../../entities/Cliente";

export class UpdateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository,
    ) { }

    async execute(data: IUpdateClienteRequestDTO): Promise<IUpdateClienteResponseDTO> {
        let { codigoCliente, nomeCliente, cpfCliente, celularCliente, emailCliente } = data;

        cpfCliente = cpfCliente.replace(/[.-]/g, '');
        if (!cpf.isValid(cpfCliente)) {
            throw new AppError("O CPF é Inválido", 400);
        }

        let clienteExists = await this.clientesRepository.getByCodigoCliente(codigoCliente);

        if (!clienteExists) {
            throw new AppError("Cliente não encontrado", 404);
        }
        // Verifica-se os dados tentando criar uma instância de cliente
        let cliente = new Cliente({ codigoCliente: clienteExists.codigoCliente, nomeCliente, cpfCliente, celularCliente, emailCliente, createdAt: clienteExists.createdAt });

        if (cpfCliente != clienteExists.cpfCliente) {
            let cpfExists = await this.clientesRepository.getByCpfCliente(cpfCliente);

            if (cpfExists) {
                throw new AppError("O novo cpf informado já está cadastrado", 400);
            }
        }

        if (emailCliente != clienteExists.emailCliente) {
            let emailExists = await this.clientesRepository.getByEmailCliente(emailCliente);

            if (emailExists) {
                throw new AppError("O novo e-mail informado já está cadastrado", 400);
            }
        }

        await this.clientesRepository.update(cliente);
        return { message: "Dados atualizados com sucesso!" };
    }
}