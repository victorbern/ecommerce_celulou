import { IClientesRepository } from "../repositories/IClientesRepository";
import { ClienteExistsUC } from "../useCases/clientes/ClienteExists/ClienteExistsUC";
import { CreateClienteController } from "../useCases/clientes/CreateCliente/CreateClienteController";
import { CreateClienteUC } from "../useCases/clientes/CreateCliente/CreateClienteUC";
import { DelClienteController } from "../useCases/clientes/DelCliente/DelClienteController";
import { DelClienteUC } from "../useCases/clientes/DelCliente/DelClienteUC";
import { FindClienteController } from "../useCases/clientes/FindCliente/FindClienteController";
import { FindClienteUC } from "../useCases/clientes/FindCliente/FindClienteUC";
import { UpdateClienteController } from "../useCases/clientes/UpdateCliente/UpdateClienteController";
import { UpdateClienteUC } from "../useCases/clientes/UpdateCliente/UpdateClienteUC";
import { EnderecoFactory } from "./EnderecoFactory";

export class ClienteFactory {

    public useCases = {
        createClienteUseCase: this.getCreateClienteUseCase.bind(this),
        delClienteUseCase: this.getDelClienteUseCase.bind(this),
        findClienteUseCase: this.getFindClienteUseCase.bind(this),
        updateClienteUseCase: this.getUpdateClienteUseCase.bind(this),
        clienteExistsUseCase: this.getClienteExistsUseCase.bind(this),
    }

    public controllers = {
        createClienteController: this.getCreateClienteController.bind(this),
        delClienteController: this.getDelClienteController.bind(this),
        findClienteController: this.getFindClienteController.bind(this),
        updateClienteController: this.getUpdateClienteController.bind(this),
    }

    constructor(
        private repository: IClientesRepository,
    ) {}

    private getCreateClienteUseCase(): CreateClienteUC {
        const createClienteUC = new CreateClienteUC(this.repository)

        return createClienteUC;
    }

    private getCreateClienteController(): CreateClienteController {
        const createClienteController = new CreateClienteController(this.getCreateClienteUseCase());
        return createClienteController;
    }

    private getDelClienteUseCase(enderecoFactory: EnderecoFactory): DelClienteUC {
        const delClienteUC = new DelClienteUC(this.repository, enderecoFactory.useCases.findEnderecoByClienteUseCase(), enderecoFactory.useCases.deleteEnderecoUseCase());
        return delClienteUC;
    }

    private getDelClienteController(enderecoFactory: EnderecoFactory): DelClienteController {
        const delClienteController = new DelClienteController(this.getDelClienteUseCase(enderecoFactory));
        return delClienteController;
    }

    private getFindClienteUseCase(): FindClienteUC {
        const findClienteUC = new FindClienteUC(this.repository);

        return findClienteUC;
    }

    private getFindClienteController(): FindClienteController {
        const findClienteController = new FindClienteController(this.getFindClienteUseCase());

        return findClienteController;
    }

    private getUpdateClienteUseCase(): UpdateClienteUC {
        const updateClienteUC = new UpdateClienteUC(this.repository);

        return updateClienteUC;
    }

    private getUpdateClienteController(): UpdateClienteController {
        const updateClienteController = new UpdateClienteController(this.getUpdateClienteUseCase());

        return updateClienteController;
    }

    private getClienteExistsUseCase(): ClienteExistsUC {
        const clienteExistsUC = new ClienteExistsUC(this.repository);

        return clienteExistsUC;
    }

}