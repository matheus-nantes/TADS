import { Router } from "express";
import { pesquisadorRoutes } from "./pesquisador.routes";

const routes = Router();

routes.use("/pesquisador", pesquisadorRoutes);

export {routes };
