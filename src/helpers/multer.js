import multer from 'multer';

//Configurar multer para poder recibir archivos con distintos formatos.
const storage = multer.diskStorage({

    destination: (req, file, cb)=> {
        //recibe el nombre de la carpeta donde se va a guardar la informacion.
        cb(null, './src/public/resources');
    },
    filename: ({session}, file, cb)=> {
        //recibe el nombre con el cual se va a guardar el archivo.
        const { user } = session.passport;
        const fileExtension = file.originalname.slice(file.originalname.length - 3, file.originalname.length);
        cb(null, `${user}.avatar.${fileExtension}`);
    },
});

export const upload = multer({ storage }); // Middleware