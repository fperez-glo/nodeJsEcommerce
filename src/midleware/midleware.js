/** VALIDA SI EL USUARIO TIENE PERMISOS PARA ACCEDER A UNA RUTA */
export function isAdmin(req, res, next) {
    console.log('entra al isAdmin:',req.session.administrador)
    if(req.session.administrador){
        next();
    } else {
        res.send({message: `error: -1, ruta ${req.url} metodo ${req.method} no autorizada.`})
    }
}