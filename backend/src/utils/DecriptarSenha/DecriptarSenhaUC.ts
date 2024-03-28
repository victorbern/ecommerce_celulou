import { IDecriptarSenhaRequestDTO, IDecriptarSenhaResponseDTO } from "./DecriptarSenhaDTO";
import bcrypt from "bcrypt";

export class DecriptarSenhaUC {
    constructor() { }

    async execute(data: IDecriptarSenhaRequestDTO): Promise<IDecriptarSenhaResponseDTO> {
        try {
            const { senha, hash } = data;

            const result = await bcrypt.compare(senha, hash);

            return { result };

        } catch (error) {
            throw error;
        }
    }
}