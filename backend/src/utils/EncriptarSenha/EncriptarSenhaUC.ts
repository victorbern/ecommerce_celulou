import { IEncriptarSenhaRequestDTO, IEncriptarSenhaResponseDTO } from "./EncriptarSenhaDTO";
import bcrypt from "bcrypt";

export class EncriptarSenhaUC {
    constructor() {}

    async execute(data: IEncriptarSenhaRequestDTO): Promise<IEncriptarSenhaResponseDTO> {
        try {
            const { senha } = data;
            const hash = await bcrypt.hash(senha, 10);

            return { hash };

        } catch (error) {
            throw error;
        }
    }
}