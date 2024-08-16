import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { IEstoqueExistsRequestDTO } from "./EstoqueExistsDTO";

export class EstoqueExistsUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
    ) {}

    async execute(data: IEstoqueExistsRequestDTO): Promise<Boolean> {
        const { codigoEstoque } = data;

        if (!codigoEstoque) {
            return false;
        } 

        const estoqueExists = await this.estoquesRepository.getByCodigo(codigoEstoque);

        if (!estoqueExists) {
            return false;
        }

        return true;
    }
}