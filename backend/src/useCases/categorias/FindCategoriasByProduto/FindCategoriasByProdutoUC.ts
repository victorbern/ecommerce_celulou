import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { ProdutoExistsUC } from "../../produtos/ProdutoExists/ProdutoExistsUC";
import { IFindCategoriasByProdutoRequestDTO, IFindCategoriasByProdutoResponseDTO } from "./FindCategoriasByProdutoDTO";

export class FindCategoriasByProdutoUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
        private produtoExistsUC: ProdutoExistsUC
    ) {}

    async execute(data: IFindCategoriasByProdutoRequestDTO): Promise<IFindCategoriasByProdutoResponseDTO[]> {
        const { codigoProduto } = data;

        if (!codigoProduto) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest)
        }

        const produtoExists = await this.produtoExistsUC.execute({ codigoProduto: codigoProduto })

        if (!produtoExists) {
            throw new AppError("Produto não encontrado!", HTTPStatusCode.NotFound)
        }

        const categorias = await this.categoriasRepository.getByCodigoProduto(codigoProduto);
        
        return categorias;
    }
}