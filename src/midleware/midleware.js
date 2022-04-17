import { console as cLog } from "../helpers/logger.js";
import { graphqlHTTP } from "express-graphql";
import { graphQLschema } from '../models/config/schemas.js';
import { graphQlRoot } from '../api/controller/graphql.controller.js'


/** Valida si el usuario es administrador para acceder a determinadas rutas. */
export const isAdmin = (req, res, next) => {
  if (req.session.administrador) {
    next();
  } else {
    res.send({
      message: `error: -1, ruta ${req.url} metodo ${req.method}. Cliente no autorizado.`,
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

//Midleware de graphql
export const graphQLHTTP = graphqlHTTP({
  schema: graphQLschema,
  rootValue: graphQlRoot,
})