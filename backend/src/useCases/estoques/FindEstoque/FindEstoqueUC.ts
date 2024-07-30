import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AppError } from "../../../errors/AppError";
import { IEstoquesRepository } from "../../../repositories/IEstoquesRepository";
import { IFindEstoqueRequestDTO, IFindEstoqueResponseDTO } from "./FindEstoqueDTO";

export class FindEstoqueUC {
    constructor(
        private estoquesRepository: IEstoquesRepository,
    ) {}

    async execute(data: IFindEstoqueRequestDTO): Promise<IFindEstoqueResponseDTO> {
        const { codigoEstoque } = data;

        if (!codigoEstoque) {
            throw new AppError("Código inválido!", HTTPStatusCode.BadRequest);
        }

        const estoque = await this.estoquesRepository.getByCodigo(codigoEstoque);

        return estoque;
    }
}