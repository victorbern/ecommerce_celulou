import multer from 'multer';
import { RequestHandler } from 'express';
import fs from "fs-extra"

const path = "./src/uploads/produtos/"
// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    let codigo = request.params.codigo;
    if (!fs.existsSync(path + codigo)) {
      fs.mkdir(path + codigo, (error) => {
        if (error) {
          throw error;
        }
      })
    }
    cb(null, path + codigo); // Defina o caminho para a sua pasta de destino
  },
  filename: function (request, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);
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

export const uploadMiddleware: RequestHandler = upload.array("imagens", 4)