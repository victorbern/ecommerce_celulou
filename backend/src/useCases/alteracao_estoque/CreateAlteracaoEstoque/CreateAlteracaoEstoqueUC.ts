import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { AlteracaoEstoque } from "../../../entities/AlteracaoEstoque";
import { AppError } from "../../../errors/AppError";
import { IAlteracaoEstoqueRepository } from "../../../repositories/IAlteracaoEstoqueRepository";
import { FindEstoqueUC } from "../../estoques/FindEstoque/FindEstoqueUC";
import { ICreateAlteracaoEstoqueRequestDTO, ICreateAlteracaoEstoqueResponseDTO } from "./CreateAlteracaoEstoqueDTO";
import uniqid from "uniqid";

export class CreateAlteracaoEstoqueUC {
    constructor(
        private alteracaoEstoqueRepository: IAlteracaoEstoqueRepository,
        private findEstoqueUC: FindEstoqueUC,
    ) { }

    async execute(data: ICreateAlteracaoEstoqueRequestDTO): Promise<ICreateAlteracaoEstoqueResponseDTO> {
        const { valorAlteracao, codigoEstoque } = data;

        let codigoAlteracaoEstoque, codigoExists = null;
        do {
            codigoAlteracaoEstoque = "G" + uniqid().slice(-11);
            codigoExists = await this.alteracaoEstoqueRepository.getByCodigo(codigoAlteracaoEstoque);
        } while (codigoExists != null);

        if (!codigoEstoque) {
            throw new AppError("Código do estoque inválido!", HTTPStatusCode.BadRequest);
        }

        const estoqueExists = await this.findEstoqueUC.execute({ codigoEstoque })

        if (!estoqueExists) {
            throw new AppError("Estoque não encontrado!", HTTPStatusCode.NotFound);
        }

        const dataAlteracao = new Date(Date.now());

        const alteracaoEstoque = new AlteracaoEstoque({ codigoAlteracaoEstoque, valorAlteracao, dataAlteracao, codigoEstoque });
        
        try {
            await this.alteracaoEstoqueRepository.save(alteracaoEstoque);

            return {
                message: "Alteração do estoque salva com sucesso!",
                codigoAlteracaoEstoque: codigoAlteracaoEstoque
            }

        } catch (error) {
            await this.alteracaoEstoqueRepository.delete(codigoAlteracaoEstoque);

            throw error;
        }
    }
}