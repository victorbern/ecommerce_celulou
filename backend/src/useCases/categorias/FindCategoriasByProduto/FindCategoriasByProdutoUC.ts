import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { FindProdutoUC } from "../../produtos/FindProduto/FindProdutoUC";
import { IFindCategoriasByProdutoRequestDTO, IFindCategoriasByProdutoResponseDTO } from "./FindCategoriasByProdutoDTO";

export class FindCategoriasByProdutoUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
        private findProdutoUC: FindProdutoUC
    ) {}

    async execute(data: IFindCategoriasByProdutoRequestDTO): Promise<IFindCategoriasByProdutoResponseDTO[]> {
        const { codigoProduto } = data;

        if (codigoProduto === null) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest)
        }

        const produtoExists = await this.findProdutoUC.execute({ codigoProduto: codigoProduto })

        if (!produtoExists) {
            throw new AppError("Produto não encontrado!", HTTPStatusCode.NotFound)
        }

        const categorias = await this.categoriasRepository.getByCodigoProduto(codigoProduto);
        
        return categorias;
    }
}