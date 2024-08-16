import { IEnderecosRepository } from "../repositories/IEnderecosRepository";
import { CreateEnderecoController } from "../useCases/enderecos/CreateEndereco/CreateEnderecoController";
import { CreateEnderecoUC } from "../useCases/enderecos/CreateEndereco/CreateEnderecoUC";
import { DeleteEnderecoController } from "../useCases/enderecos/DeleteEndereco/DeleteEnderecoController";
import { DeleteEnderecoUC } from "../useCases/enderecos/DeleteEndereco/DeleteEnderecoUC";
import { FindEnderecoController } from "../useCases/enderecos/FindEndereco/FindEnderecoController";
import { FindEnderecoUC } from "../useCases/enderecos/FindEndereco/FindEnderecoUC";
import { FindEnderecoByClienteController } from "../useCases/enderecos/FindEnderecoByCliente/FindEnderecoByClienteController";
import { FindEnderecoByClienteUC } from "../useCases/enderecos/FindEnderecoByCliente/FindEnderecoByClienteUC";
import { UpdateEnderecoController } from "../useCases/enderecos/UpdateEndereco/UpdateEnderecoController";
import { UpdateEnderecoUC } from "../useCases/enderecos/UpdateEndereco/UpdateEnderecoUC";
import { ClienteFactory } from "./ClienteFactory";

export class EnderecoFactory {

    public useCases = {
        createEnderecoUseCase: this.getCreateEnderecoUseCase.bind(this),
        findEnderecoByClienteUseCase: this.getFindEnderecoByClienteUseCase.bind(this),
        deleteEnderecoUseCase: this.getDeleteEnderecoUseCase.bind(this),
        findEnderecoUseCase: this.getFindEnderecoUseCase.bind(this),
        updateEnderecoUseCase: this.getUpdateEnderecoUseCase.bind(this),
    }

    public controllers = {
        createEnderecoController: this.getCreateEnderecoController.bind(this),
        findEnderecoByClienteController: this.getFindEnderecoByClienteController.bind(this),
        deleteEnderecoController: this.getDeleteEnderecoController.bind(this),
        findEnderecoController: this.getFindEnderecoController.bind(this),
        updateEnderecoController: this.getUpdateEnderecoController.bind(this),
    }

    constructor(
        private repository: IEnderecosRepository,
    ) {}

    private getCreateEnderecoUseCase(clienteFactory: ClienteFactory): CreateEnderecoUC {
        const createEnderecoUC = new CreateEnderecoUC(this.repository, clienteFactory.useCases.clienteExistsUseCase());

        return createEnderecoUC;
    }

    private getCreateEnderecoController(clienteFactory: ClienteFactory): CreateEnderecoController {
        const createEnderecoController = new CreateEnderecoController(this.getCreateEnderecoUseCase(clienteFactory));

        return createEnderecoController;
    }

    private getFindEnderecoByClienteUseCase(): FindEnderecoByClienteUC {
        const findEnderecoByClienteUC = new FindEnderecoByClienteUC(this.repository);

        return findEnderecoByClienteUC;
    }

    private getFindEnderecoByClienteController(): FindEnderecoByClienteController {
        const findEnderecoByClienteController = new FindEnderecoByClienteController(this.getFindEnderecoByClienteUseCase());

        return findEnderecoByClienteController;
    }

    private getDeleteEnderecoUseCase(): DeleteEnderecoUC {
        const deleteEnderecoUC = new DeleteEnderecoUC(this.repository);

        return deleteEnderecoUC;
    }

    private getDeleteEnderecoController(): DeleteEnderecoController {
        const deleteEnderecoController = new DeleteEnderecoController(this.getDeleteEnderecoUseCase());

        return deleteEnderecoController;
    }

    private getFindEnderecoUseCase(): FindEnderecoUC {
        const findEnderecoUC = new FindEnderecoUC(this.repository);

        return findEnderecoUC;
    }

    private getFindEnderecoController(): FindEnderecoController {
        const findEnderecoController = new FindEnderecoController(this.getFindEnderecoUseCase());

        return findEnderecoController;
    }

    private getUpdateEnderecoUseCase(): UpdateEnderecoUC {
        const updateEnderecoUC = new UpdateEnderecoUC(this.repository);

        return updateEnderecoUC;
    }

    private getUpdateEnderecoController(): UpdateEnderecoController {
        const updateEnderecoController = new UpdateEnderecoController(this.getUpdateEnderecoUseCase());

        return updateEnderecoController;
    }
}