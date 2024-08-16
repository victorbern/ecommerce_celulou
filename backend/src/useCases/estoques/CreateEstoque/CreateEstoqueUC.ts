import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { Estoque } from "../../../entities/Estoque";
import { AppError } from "../../../errors/AppError";
import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { ProdutoExistsUC } from "../../produtos/ProdutoExists/ProdutoExistsUC";
import { ICreateEstoqueRequestDTO, ICreateEstoqueResponseDTO } from "./CreateEstoqueDTO";
import uniqid from "uniqid";

export class CreateEstoqueUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
        private produtoExistsUC: ProdutoExistsUC
    ) {}

    async execute(data: ICreateEstoqueRequestDTO): Promise<ICreateEstoqueResponseDTO> {
        let { quantidade, codigoProduto } = data;

        if (quantidade === null || quantidade === undefined) {
            quantidade = 0;
        }

        if (quantidade < 0) {
            throw new AppError("Quantidade inválida!", HTTPStatusCode.BadRequest);
        }

        if (!codigoProduto) {
            throw new AppError("Código de produto inválido", HTTPStatusCode.BadRequest);
        }

        const produtoExists = await this.produtoExistsUC.execute({ codigoProduto: codigoProduto });

        if (!produtoExists) {
            throw new AppError("Produto não encontrado!", HTTPStatusCode.NotFound)
        }

        const estoqueExists = await this.estoquesRepository.getByProduto(codigoProduto);

        if (estoqueExists) {
            return {
                message: "Este produto já possui estoque",
                codigoEstoque: estoqueExists.codigoEstoque
            }
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