import { console as cLog } from "../helpers/logger.js";

/** Valida si el usuario es administrador para acceder a determinadas rutas. */
export const isAdmin = (req, res, next) => {
  if (true /*req.session.administrador*/) {
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