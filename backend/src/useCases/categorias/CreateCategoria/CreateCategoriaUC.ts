import { HTTPStatusCode } from "../../../../lib/http/HttpStatusCode";
import { Categoria } from "../../../entities/Categoria";
import { AppError } from "../../../errors/AppError";
import { ICategoriasRepository } from "../../../repositories/ICategoriasRepository";
import { ICreateCategoriaRequestDTO, ICreateCategoriaResponseDTO } from "./CreateCategoriaDTO";
import uniqid from "uniqid";

export class CreateCategoriaUC {
    constructor(
        private categoriasRepository: ICategoriasRepository,
    ) {}

    async execute(data: ICreateCategoriaRequestDTO): Promise<ICreateCategoriaResponseDTO> {
        const { nomeCategoria } = data;

        const categoriaExists = await this.categoriasRepository.getByName(nomeCategoria);

        if (categoriaExists) {
            throw new AppError("Esta categoria já existe", HTTPStatusCode.Conflict);
        }

        let codigoCategoria, codigoExists = null;
        do {
            codigoCategoria = "T" + uniqid().slice(-11);
            codigoExists = await this.categoriasRepository.getByCodigo(codigoCategoria);
        } while (codigoExists != null);

        const categoria = new Categoria({ codigoCategoria, nomeCategoria });

        await this.categoriasRepository.save(categoria);

        return { 
            message: "Categoria cadastrada com sucesso!",
            codigoCategoria: codigoCategoria
        }
    }
}