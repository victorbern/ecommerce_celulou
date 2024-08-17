import { ICategoriasRepository } from "../repositories/ICategoriasRepository";
import { CategoriaExistsUC } from "../useCases/categorias/CategoriaExists/CategoriaExistsUC";
import { CreateCategoriaController } from "../useCases/categorias/CreateCategoria/CreateCategoriaController";
import { CreateCategoriaUC } from "../useCases/categorias/CreateCategoria/CreateCategoriaUC";
import { DeleteCategoriaController } from "../useCases/categorias/DeleteCategoria/DeleteCategoriaController";
import { DeleteCategoriaUC } from "../useCases/categorias/DeleteCategoria/DeleteCategoriaUC";
import { FindAllCategoriaController } from "../useCases/categorias/FindAllCategoria/FindAllCategoriaController";
import { FindAllCategoriaUC } from "../useCases/categorias/FindAllCategoria/FindAllCategoriaUC";
import { FindCategoriaController } from "../useCases/categorias/FindCategoria/FindCategoriaController";
import { FindCategoriaUC } from "../useCases/categorias/FindCategoria/FindCategoriaUC";
import { FindCategoriasByProdutoController } from "../useCases/categorias/FindCategoriasByProduto/FindCategoriasByProdutoController";
import { FindCategoriasByProdutoUC } from "../useCases/categorias/FindCategoriasByProduto/FindCategoriasByProdutoUC";
import { UpdateCategoriaController } from "../useCases/categorias/UpdateCategoria/UpdateCategoriaController";
import { UpdateCategoriaUC } from "../useCases/categorias/UpdateCategoria/UpdateCategoriaUC";
import { ProdutoFactory } from "./ProdutoFactory";

export class CategoriaFactory {
    public useCases = {
        categoriaExistsUseCase: this.getCategoriaExistsUseCase.bind(this),
        createCategoriaUseCase: this.getCreateCategoriaUseCase.bind(this),
        deleteCategoriaUseCase: this.getDeleteCategoriaUseCase.bind(this),
        findAllCategoriaUseCase: this.getFindAllCategoriaUseCase.bind(this),
        findCategoriaUseCase: this.getFindCategoriaUseCase.bind(this),
        findCategoriasByProdutoUseCase: this.getFindCategoriasByProdutoUseCase.bind(this),
        updateCategoriaUseCase: this.getUpdateCategoriaUseCase.bind(this),
    }

    public controllers = {
        createCategoriaController: this.getCreateCategoriaController.bind(this),
        deleteCategoriaController: this.getDeleteCategoriaController.bind(this),
        findAllCategoriaController: this.getFindAllCategoriaController.bind(this),
        findCategoriaController: this.getFindCategoriaController.bind(this),
        findCategoriasByProdutoController: this.getFindCategoriasByProdutoController.bind(this),
        updateCategoriaController: this.getUpdateCategoriaController.bind(this),
    }

    constructor(
        private repository: ICategoriasRepository,
    ) {}

    private getCategoriaExistsUseCase(): CategoriaExistsUC {
        const categoriaExistsUC = new CategoriaExistsUC(this.repository);

        return categoriaExistsUC;
    }

    private getCreateCategoriaUseCase(): CreateCategoriaUC {
        const createCategoriaUC = new CreateCategoriaUC(this.repository);

        return createCategoriaUC;
    }

    private getCreateCategoriaController(): CreateCategoriaController {
        const createCategoriaController = new CreateCategoriaController(this.getCreateCategoriaUseCase());

        return createCategoriaController;
    }

    private getDeleteCategoriaUseCase(): DeleteCategoriaUC {
        const deleteCategoriaUC = new DeleteCategoriaUC(this.repository);

        return deleteCategoriaUC;
    }

    private getDeleteCategoriaController(): DeleteCategoriaController {
        const deleteCategoriaController = new DeleteCategoriaController(this.getDeleteCategoriaUseCase());

        return deleteCategoriaController;
    }

    private getFindAllCategoriaUseCase(): FindAllCategoriaUC {
        const findAllCategoriaUC = new FindAllCategoriaUC(this.repository);

        return findAllCategoriaUC;
    }

    private getFindAllCategoriaController(): FindAllCategoriaController {
        const findAllCategoriaController = new FindAllCategoriaController(this.getFindAllCategoriaUseCase());

        return findAllCategoriaController;
    }

    private getFindCategoriaUseCase(): FindCategoriaUC {
        const findCategoriaUC = new FindCategoriaUC(this.repository);

        return findCategoriaUC;
    }

    private getFindCategoriaController(): FindCategoriaController {
        const findCategoriaController = new FindCategoriaController(this.getFindCategoriaUseCase());

        return findCategoriaController;
    }

    private getFindCategoriasByProdutoUseCase(produtoFactory: ProdutoFactory): FindCategoriasByProdutoUC {
        const findCategoriasByProdutoUC = new FindCategoriasByProdutoUC(this.repository, produtoFactory.useCases.produtoExistsUseCase());

        return findCategoriasByProdutoUC;
    }

    private getFindCategoriasByProdutoController(produtoFatory: ProdutoFactory): FindCategoriasByProdutoController {
        const findCategoriasByProdutoController = new FindCategoriasByProdutoController(this.getFindCategoriasByProdutoUseCase(produtoFatory));

        return findCategoriasByProdutoController;
    }

    private getUpdateCategoriaUseCase(): UpdateCategoriaUC {
        const updateCategoriaUC = new UpdateCategoriaUC(this.repository);

        return updateCategoriaUC;
    }

    private getUpdateCategoriaController(): UpdateCategoriaController {
        const updateCategoriaController = new UpdateCategoriaController(this.getUpdateCategoriaUseCase());

        return updateCategoriaController;
    }
}