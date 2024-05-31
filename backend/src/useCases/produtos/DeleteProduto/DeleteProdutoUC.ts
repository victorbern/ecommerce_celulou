import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { IDeleteProdutoRequestDTO, IDeleteProdutoResponseDTO } from "./DeleteProdutoDTO";

export class DeleteProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository,
    ) {}

    async execute(data: IDeleteProdutoRequestDTO): Promise<IDeleteProdutoResponseDTO> {
        return;
    }
}