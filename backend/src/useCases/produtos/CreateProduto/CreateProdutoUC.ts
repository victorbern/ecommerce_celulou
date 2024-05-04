import { Produto } from "../../../entities/Produto";
import { AppError } from "../../../errors/AppError";
import { IProdutosRepository } from "../../../repositories/IProdutosRepository";
import { ICreateProdutoRequestDTO, ICreateProdutoResponseDTO } from "./CreateProdutoDTO";
import uniqid from "uniqid";

export class CreateProdutoUC {
    constructor(
        private produtosRepository: IProdutosRepository
    ) {}

    async execute(data: ICreateProdutoRequestDTO): Promise<ICreateProdutoResponseDTO> {
        const { valor, nomeProduto, marca, descricaoProduto, pesoGramas, alturaCM, larguraCM, comprimentoCM } = data;

        const produtoExists = await this.produtosRepository.getByNome(nomeProduto);

        if (produtoExists) {
            throw new AppError("Este produto já existe", 400);
        }

        let codigoProduto, codigoExists = null;
        do {
            codigoProduto = "P" + uniqid().slice(-11);
            codigoExists = await this.produtosRepository.getByCodigo(codigoProduto);
        } while (codigoExists != null);
    
        // A nota se inicia nula, já que é um produto novo e não tem avaliações
        let nota = null;  

        // Criar pasta antes de mudar nome para imagensFolder
        const imagensFolder = "/produtos/" + codigoProduto + "/";

        // Testar se o que está sendo salvo em imagensFolder está correto
        
        const produto = new Produto({ codigoProduto, valor, nomeProduto, marca, descricaoProduto, imagensFolder, nota, pesoGramas, alturaCM, larguraCM, comprimentoCM });

        await this.produtosRepository.save(produto);

        return { message: "Produto cadastrado com sucesso", codigoProduto: codigoProduto }
    }
}