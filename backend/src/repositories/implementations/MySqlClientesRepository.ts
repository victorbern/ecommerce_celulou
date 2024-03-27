import { PrismaClient } from "@prisma/client";
import { IClientesRepository } from "../IClientesRepository";

export class MySqlClientesRepository implements IClientesRepository {
    private prisma = new PrismaClient();

}