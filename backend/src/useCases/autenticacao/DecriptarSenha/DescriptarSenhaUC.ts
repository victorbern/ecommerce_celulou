import bcrypt from "bcrypt";
import { IDecriptarSenhaRequestDTO } from "./DecriptarSenhaDTO";

export class DecriptarSenhaUC {
    constructor() {}

    async execute(data: IDecriptarSenhaRequestDTO): Promise<boolean> {

        const { hash, senhaInput } = data;

        try {
            const isEqual = await bcrypt.compare(senhaInput, hash);

            return isEqual;
        } catch (error) {
            throw error;
        }
    }
}