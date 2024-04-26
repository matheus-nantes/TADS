import { Router } from "express";
import { pesquisadorRoutes } from "./pesquisador.routes";
import { condicaoRoutes } from "./condicaoClimatica.routes";

const routes = Router();

routes.use("/pesquisador", pesquisadorRoutes);
routes.use("/condicao", condicaoRoutes);

export { routes };
