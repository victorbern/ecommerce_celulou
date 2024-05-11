import { Request, Response, NextFunction } from "express";
import fs from "fs-extra"

export const deleteFolder = (
    request: Request, response: Response, next: NextFunction
) => {
    let path = "./src/uploads/produtos/"
    path = path + request.params.codigo;

    if (fs.existsSync(path)) {
        fs.removeSync(path);
    }

    next();
}

