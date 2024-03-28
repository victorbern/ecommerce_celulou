import { IDecriptarSenhaRequestDTO, IDecriptarSenhaResponseDTO } from "./DecriptarSenhaDTO";
import bcrypt from "bcrypt";

export class DecriptarSenhaUC {
    constructor() { }

    async execute(data: IDecriptarSenhaRequestDTO): Promise<IDecriptarSenhaResponseDTO> {
        try {
            const { senha, hash } = data;
            bcrypt.compare(senha, hash, (err, result) => {
                if (err) {
                    console.error(err);
                    throw err;
                }
                if (result) {
                    return true;
                } else {
                    return false;
                }
            });
            return;
        } catch (error) {
            throw error;
        }
    }
}