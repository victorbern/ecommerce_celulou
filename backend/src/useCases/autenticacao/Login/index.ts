import { postgresClientesRepository } from "../../../repositories/implementations";
import { LoginController } from "./LoginController";
import { LoginUC } from "./LoginUC";

const loginUC = new LoginUC(postgresClientesRepository);
const loginController = new LoginController(loginUC);

export { loginUC, loginController }