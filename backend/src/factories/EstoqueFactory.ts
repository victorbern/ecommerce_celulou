import { IEstoquesRepository } from "../repositories/IEstoquesRepository";
import { AlterarEstoqueController } from "../useCases/estoques/AlterarEstoque/AlterarEstoqueController";
import { AlterarEstoqueUC } from "../useCases/estoques/AlterarEstoque/AlterarEstoqueUC";
import { CreateEstoqueUC } from "../useCases/estoques/CreateEstoque/CreateEstoqueUC";
import { EstoqueExistsUC } from "../useCases/estoques/EstoqueExists/EstoqueExistsUC";
import { FindEstoqueController } from "../useCases/estoques/FindEstoque/FindEstoqueController";
import { FindEstoqueUC } from "../useCases/estoques/FindEstoque/FindEstoqueUC";
import { AlteracaoEstoqueFactory } from "./AlteracaoEstoqueFactory";
import { ProdutoFactory } from "./ProdutoFactory";

export class EstoqueFactory {

    public useCases = {
        estoqueExistsUseCase: this.getEstoqueExistsUseCase.bind(this),
        createEstoqueUseCase: this.getCreateEstoqueUseCase.bind(this),
        alterarEstoqueUseCase: this.getAlterarEstoqueUseCase.bind(this),
        findEstoqueUseCase: this.getFindEstoqueUseCase.bind(this),
    }

    public controllers = {
        alterarEstoqueController: this.getAlterarEstoqueController.bind(this),
        findEstoqueController: this.getFindEstoqueController.bind(this),
    }

    constructor(
        private repository: IEstoquesRepository,
    ) {}

    private getEstoqueExistsUseCase(): EstoqueExistsUC {
        const estoqueExistsUC = new EstoqueExistsUC(this.repository);

        return estoqueExistsUC;
    }

    private getCreateEstoqueUseCase(produtoFactory: ProdutoFactory): CreateEstoqueUC {
        const createEstoqueUC = new CreateEstoqueUC(this.repository, produtoFactory.useCases.produtoExistsUseCase());

        return createEstoqueUC;
    }

    private getAlterarEstoqueUseCase(alteracaoEstoqueFactory: AlteracaoEstoqueFactory, produtoFactory: ProdutoFactory): AlterarEstoqueUC {
        const alterarEstoqueUC = new AlterarEstoqueUC(this.repository, alteracaoEstoqueFactory.useCases.createAlteracaoEstoqueUseCase(this), produtoFactory.useCases.produtoExistsUseCase());

        return alterarEstoqueUC;
    }

    private getAlterarEstoqueController(alteracaoEstoqueFactory: AlteracaoEstoqueFactory, produtoFactory: ProdutoFactory): AlterarEstoqueController {
        const alterarEstoqueController = new AlterarEstoqueController(this.getAlterarEstoqueUseCase(alteracaoEstoqueFactory, produtoFactory));

        return alterarEstoqueController;
    }

    private getFindEstoqueUseCase(): FindEstoqueUC {
        const findEstoqueUC = new FindEstoqueUC(this.repository);

        return findEstoqueUC;
    }

    private getFindEstoqueController(): FindEstoqueController {
        const findEstoqueController = new FindEstoqueController(this.getFindEstoqueUseCase());

        return findEstoqueController;
    }
}