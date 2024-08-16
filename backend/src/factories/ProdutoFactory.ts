import { IProdutosRepository } from "../repositories/IProdutosRepository";
import { CreateProdutoController } from "../useCases/produtos/CreateProduto/CreateProdutoController";
import { CreateProdutoUC } from "../useCases/produtos/CreateProduto/CreateProdutoUC";
import { FindAllProdutoByCategoriasController } from "../useCases/produtos/FindAllProdutoByCategorias/FindAllProdutoByCategoriasController";
import { FindAllProdutoByCategoriasUC } from "../useCases/produtos/FindAllProdutoByCategorias/FindAllProdutoByCategoriasUC";
import { FindAllProdutoUC } from "../useCases/produtos/FindAllProdutoByCategorias/FindAllProdutoUC";
import { FindProdutoController } from "../useCases/produtos/FindProduto/FindProdutoController";
import { FindProdutoUC } from "../useCases/produtos/FindProduto/FindProdutoUC";
import { ProdutoExistsUC } from "../useCases/produtos/ProdutoExists/ProdutoExistsUC";
import { UpdateIsDisponivelProdutoController } from "../useCases/produtos/UpdateIsDisponivelProduto/UpdateIsDisponivelProdutoController";
import { UpdateIsDisponivelProdutoUC } from "../useCases/produtos/UpdateIsDisponivelProduto/UpdateIsDisponivelProdutoUC";
import { UpdateIsVisibleProdutoController } from "../useCases/produtos/UpdateIsVisibleProduto/UpdateIsVisibleProdutoController";
import { UpdateIsVisibleProdutoUC } from "../useCases/produtos/UpdateIsVisibleProduto/UpdateIsVisibleProdutoUC";
import { UpdateProdutoController } from "../useCases/produtos/UpdateProduto/UpdateProdutoController";
import { UpdateProdutoUC } from "../useCases/produtos/UpdateProduto/UpdateProdutoUC";
import { CategoriaFactory } from "./CategoriaFactory";
import { EstoqueFactory } from "./EstoqueFactory";

export class ProdutoFactory {

    public useCases = {
        produtoExistsUseCase: this.getProdutoExistsUseCase.bind(this),
        createProdutoUseCase: this.getCreateProdutoUseCase.bind(this),
        findAllProdutoUseCase: this.getFindAllProdutoUseCase.bind(this),
        findAllProdutoByCategoriasUseCase: this.getFindAllProdutoByCategoriasUseCase.bind(this),
        findProdutoUseCase: this.getFindProdutoUseCase.bind(this),
        updateIsDisponivelProdutoUseCase: this.getUpdateIsDisponivelProdutoUseCase.bind(this),
        updateIsVisibleProdutoUseCase: this.getUpdateIsVisibleProdutoUseCase.bind(this),
        updateProdutoUseCase: this.getUpdateProdutoUseCase.bind(this),
    }

    public controllers = {
        createProdutoController: this.getCreateProdutoController.bind(this),
        findAllProdutoByCategoriasController: this.getFindAllProdutoByCategoriasController.bind(this),
        findProdutoController: this.getFindProdutoController.bind(this),
        updateIsDisponivelProdutoController: this.getUpdateIsDisponivelProdutoController.bind(this),
        updateIsVisibleProdutoController: this.getUpdateIsVisibleProdutoController.bind(this),
        updateProdutoController: this.getUpdateProdutoController.bind(this),
    }

    constructor(
        private repository: IProdutosRepository,
    ) {}

    private getProdutoExistsUseCase(): ProdutoExistsUC {
        const produtoExistsUC = new ProdutoExistsUC(this.repository);

        return produtoExistsUC;
    }

    private getCreateProdutoUseCase(categoriaFactory: CategoriaFactory, estoqueFactory: EstoqueFactory): CreateProdutoUC {
        const createProdutoUC = new CreateProdutoUC(this.repository, categoriaFactory.useCases.categoriaExistsUseCase(), estoqueFactory.useCases.createEstoqueUseCase(this));

        return createProdutoUC;
    }

    private getCreateProdutoController(categoriaFactory: CategoriaFactory, estoqueFactory: EstoqueFactory): CreateProdutoController {
        const createProdutoController = new CreateProdutoController(this.getCreateProdutoUseCase(categoriaFactory, estoqueFactory));

        return createProdutoController;
    }

    private getFindAllProdutoUseCase(): FindAllProdutoUC {
        const findAllProdutoUC = new FindAllProdutoUC(this.repository);

        return findAllProdutoUC;
    }

    private getFindAllProdutoByCategoriasUseCase(): FindAllProdutoByCategoriasUC {
        const findAllProdutoByCategoriasUC = new FindAllProdutoByCategoriasUC(this.repository);

        return findAllProdutoByCategoriasUC;
    }

    private getFindAllProdutoByCategoriasController(): FindAllProdutoByCategoriasController {
        const findAllProdutoByCategoriasController = new FindAllProdutoByCategoriasController(this.getFindAllProdutoByCategoriasUseCase(), this.getFindAllProdutoUseCase());

        return findAllProdutoByCategoriasController;
    }

    private getFindProdutoUseCase(): FindProdutoUC {
        const findProdutoUC = new FindProdutoUC(this.repository);

        return findProdutoUC;
    }

    private getFindProdutoController(): FindProdutoController {
        const findProdutoController = new FindProdutoController(this.getFindProdutoUseCase());

        return findProdutoController;
    }

    private getUpdateIsDisponivelProdutoUseCase(): UpdateIsDisponivelProdutoUC {
        const updateIsDisponivelProdutoUC = new UpdateIsDisponivelProdutoUC(this.repository);

        return updateIsDisponivelProdutoUC;
    }

    private getUpdateIsDisponivelProdutoController(): UpdateIsDisponivelProdutoController {
        const updateIsDisponivelProdutoController = new UpdateIsDisponivelProdutoController(this.getUpdateIsDisponivelProdutoUseCase());

        return updateIsDisponivelProdutoController;
    }

    private getUpdateIsVisibleProdutoUseCase(): UpdateIsVisibleProdutoUC {
        const updateIsVisibleProdutoUC = new UpdateIsVisibleProdutoUC(this.repository);

        return updateIsVisibleProdutoUC;
    }

    private getUpdateIsVisibleProdutoController(): UpdateIsVisibleProdutoController {
        const updateIsVisibleProdutoController = new UpdateIsVisibleProdutoController(this.getUpdateIsVisibleProdutoUseCase());

        return updateIsVisibleProdutoController;
    }

    private getUpdateProdutoUseCase(): UpdateProdutoUC {
        const updateProdutoUC = new UpdateProdutoUC(this.repository);

        return updateProdutoUC;
    }

    private getUpdateProdutoController(): UpdateProdutoController {
        const updateProdutoController = new UpdateProdutoController(this.getUpdateProdutoUseCase());

        return updateProdutoController;
    }
}