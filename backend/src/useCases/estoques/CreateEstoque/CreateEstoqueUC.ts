import { Estoque } from "../../../entities/Estoque";
import { AppError } from "../../../errors/AppError";
import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { ICreateEstoqueRequestDTO, ICreateEstoqueResponseDTO } from "./CreateEstoqueDTO";
import uniqid from "uniqid";

export class CreateEstoqueUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
        private findProduto: FindProdutoUC
    ) {}

    async execute(data: ICreateEstoqueRequestDTO): Promise<ICreateEstoqueResponseDTO> {
        let { quantidade, codigoProduto } = data;

        if (quantidade === null || quantidade === undefined) {
            quantidade = 0;
        }

        if (!codigoProduto) {
            throw new AppError("Código de produto inválido", 400);
        }

        let codigoEstoque, codigoExists = null;
        do {
            codigoEstoque = "F" + uniqid().slice(-11);
            codigoExists = await this.estoquesRepository.getByCodigo(codigoProduto);
        } while (codigoExists != null);

        const estoque = new Estoque({ codigoEstoque: codigoEstoque, quantidade: quantidade, codigoProduto: codigoProduto })

        await this.estoquesRepository.save(estoque);

        return {
            message: "Estoque criado com sucesso!",
            codigoEstoque: codigoEstoque
        }
    }
}