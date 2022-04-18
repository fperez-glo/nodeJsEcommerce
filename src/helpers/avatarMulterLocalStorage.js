import multer from 'multer';
import { userDao } from "../models/daos/index.js";

//Configurar multer para poder recibir archivos con distintos formatos.
const storage = multer.diskStorage({

    destination: (req, file, cb)=> {
        //recibe el nombre de la carpeta donde se va a guardar la informacion.
        cb(null, './src/views/public/resources');
    },
    filename: async ({session}, file, cb)=> {
        //recibe el nombre con el cual se va a guardar el archivo.
        const { user } = session.passport;
        const fileExtension = file.originalname.slice(file.originalname.length - 3, file.originalname.length);
        const fileName = `${user}_avatar.${fileExtension}`;
        const avatarPath = `/public/resources/${fileName}`;
        await userDao.putUpdate(user, { avatarPath });
        session.avatarPath = avatarPath;
        cb(null, fileName);
    },
});

export const upload = multer({ storage }); // Middleware