import uniqid from "uniqid";
import { IGenerateCodigoResponseDTO } from "./IGenerateCodigoDTO";

export class GenerateCodigoUC {
    constructor() {}

    async execute(): Promise<IGenerateCodigoResponseDTO> {
        try {
            let codigo = uniqid().slice(-11);
            return { codigo };
        } catch (error) {

        }
    }
}