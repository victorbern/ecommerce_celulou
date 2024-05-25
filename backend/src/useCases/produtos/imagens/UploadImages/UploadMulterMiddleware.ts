import multer from 'multer';
import { RequestHandler } from 'express';
import fs from "fs-extra"
import path from "path"

const pathDestino = "./src/uploads/produtos/"

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    try {
      const codigo = request.params.codigo;
      const dirPath = path.join(pathDestino, codigo)
      
      fs.ensureDirSync(pathDestino);
      fs.ensureDirSync(dirPath);

      cb(null, dirPath);
    } catch (error) {
      if (error instanceof Error) {
      cb(error, null)
      } else {
        cb(new Error("Erro desconhecido ao criar diretório"), null);
      }
    }
    // Defina o caminho para a sua pasta de destino
  },
  filename: function (request, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + ext);
  }
});

// Filtragem de arquivos permitidos
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configuração do Multer
const upload = multer({ storage: storage, fileFilter: fileFilter })

// export const uploadMiddleware: RequestHandler = upload.array("imagens", 4)
export const uploadMiddleware: RequestHandler = upload.fields([
  { name: "foto-1", maxCount: 1 },
  { name: "foto-2", maxCount: 1 },
  { name: "foto-3", maxCount: 1 },
  { name: "foto-4", maxCount: 1 }
])