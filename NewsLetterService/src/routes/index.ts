import { Router } from "express";
import { inscricaoRoutes } from "./inscricao.routes";
import { relatorioRoutes } from "./relatorio.routes";

const routes = Router();

routes.use("/inscricao", inscricaoRoutes);
routes.use("/relatorio", relatorioRoutes);

export { routes };
