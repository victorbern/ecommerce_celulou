import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { FindCategoriaUC } from "../../categorias/FindCategoria/FindCategoriaUC";
import { IUpdateCategoriasProdutoRequestDTO, IUpdateCategoriasProdutoResponseDTO } from "./UpdateCategoriasProdutoDTO";

export class UpdateCategoriasProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
        private findCategoriaUC: FindCategoriaUC
    ) {}

    async execute(data: IUpdateCategoriasProdutoRequestDTO): Promise<IUpdateCategoriasProdutoResponseDTO> {
        const { categorias } = data;

        if (categorias && categorias.length > 0) {
            const promises = categorias.map(async (categoria) => {
                const result = await this.findCategoriaUC.execute({
                    codigoCategoria: categoria.codigoCategoria
                })

                if (!result) {
                    throw new AppError("Categoria '" + categoria.codigoCategoria + "' não encontrada!", 404);
                }
            })

            await Promise.all(promises);
        }

        await this.produtosRepository.updateCategorias(categorias);

        return {
            message: "Categorias alteradas com sucesso!"
        }
    }
}