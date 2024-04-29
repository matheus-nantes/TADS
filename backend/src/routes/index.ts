import { Router } from "express";
import { pesquisadorRoutes } from "./pesquisador.routes";
import { condicaoRoutes } from "./condicaoClimatica.routes";
import { localizacaoRoutes } from "./localizacao.routes";

const routes = Router();

routes.use("/pesquisador", pesquisadorRoutes);
routes.use("/condicao", condicaoRoutes);
routes.use("/localizacao", localizacaoRoutes);

export { routes };
