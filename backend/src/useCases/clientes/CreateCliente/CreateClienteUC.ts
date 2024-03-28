import { Cliente } from "../../../entities/Cliente";
import { AppError } from "../../../errors/AppError";
import { IClientesRepository } from "../../../repositories/IClientesRepository";
import { encriptarSenhaUC } from "../../../utils/EncriptarSenha";
import { validarFormClienteUC } from "../ValidarFormCliente";
import { ICreateClienteRequestDTO, ICreateClienteResponseDTO } from "./CreateClienteDTO";
import uniqid from "uniqid";
import { cpf } from "cpf-cnpj-validator";

export class CreateClienteUC {
    constructor(
        private clientesRepository: IClientesRepository
    ) {}

    async execute(data: ICreateClienteRequestDTO): Promise<ICreateClienteResponseDTO> {
        try {
            let { nomeCliente, cpfCliente, celularCliente, emailCliente, senha } = data;
            cpfCliente = cpfCliente.replace(/[.-]/g, '');

            if (!cpf.isValid(cpfCliente)) {
                throw new AppError("O CPF é Inválido", 400);
            }

            await validarFormClienteUC.execute({
                nomeCliente, cpfCliente, celularCliente, emailCliente, senha
            });

            const hash = (await encriptarSenhaUC.execute({ senha })).hash;

            let codigo, codigoExists = null;

            do {
                codigo = "C" + uniqid().slice(-11);
    
                codigoExists = await this.clientesRepository.getByCodigoCliente(codigo);
                
            } while (codigoExists != null);

            const createdAt = new Date(Date.now());
            const isAdmin = false;

            const cliente = new Cliente({nomeCliente, cpfCliente, celularCliente, emailCliente, senha: hash, createdAt, isAdmin}, codigo);

            await this.clientesRepository.save(cliente);

            return { message: "Cliente cadastrado com sucesso!" }
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new AppError("Unexpected error!", 500)
            }
        }
    }


}