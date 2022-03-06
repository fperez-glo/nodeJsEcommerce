import { console as cLog } from "../helpers/logger.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';

/** Valida si el usuario es administrador para acceder a determinadas rutas. */
export const isAdmin = (req, res, next) => {
  if (req.session.administrador) {
    next();
  } else {
    res.send({
      message: `error: -1, ruta ${req.url} metodo ${req.method} no autorizada.`,
    });
  }
};

/** Valida si la ruta existe. */
export const ifRouteNotExists = (req, res, next) => {
  const message = `error: -2, descripcion: ruta "${req.url}" no implementada, metodo: ${req.method}.`;
  res.render("./error_views/404notFound", { message });
  // res.send({message: `error: -2, descripcion: ruta ${req.url} metodo: ${req.method} no implementada.`})
};

/** Midleware para logs. */
export const infoLogger = ({ method, originalUrl }, { statusCode }, next) => {
  const logInfo = `Request: [${method}] ${originalUrl}`;

  cLog.info(logInfo);
  next();
};

/** Midleware para levantar la session en Mongo Atlas */
export const createMongoSession = () => {
  session({
    store: MongoStore.create({
    mongoUrl:
      MONGOCONNECTSTRING,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    //Esto no funciona muy bien ya que el servidor toma la hora local que no es la de Argentina.
    cookie: {
        maxAge: 600000, //10 minutos de expiracion de la sesion.
    }
})
}