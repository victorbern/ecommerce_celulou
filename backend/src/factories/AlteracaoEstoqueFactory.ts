import { IAlteracaoEstoqueRepository } from "../repositories/IAlteracaoEstoqueRepository";
import { CreateAlteracaoEstoqueUC } from "../useCases/alteracao_estoque/CreateAlteracaoEstoque/CreateAlteracaoEstoqueUC";
import { EstoqueFactory } from "./EstoqueFactory";

export class AlteracaoEstoqueFactory {

    public useCases = {
        createAlteracaoEstoqueUseCase: this.getCreateAlteracaoEstoqueUseCase.bind(this),
    }

    constructor(
        private repository: IAlteracaoEstoqueRepository,
    ) {}

    private getCreateAlteracaoEstoqueUseCase(estoqueFactory: EstoqueFactory): CreateAlteracaoEstoqueUC {
        const createAlteracaoEstoqueUC = new CreateAlteracaoEstoqueUC(this.repository, estoqueFactory.useCases.estoqueExistsUseCase());

        return createAlteracaoEstoqueUC;
    }
}