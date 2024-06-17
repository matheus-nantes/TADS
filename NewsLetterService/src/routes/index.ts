import { Router } from "express";
import { inscricaoRoutes } from "./inscricao.routes";

const routes = Router();

routes.use("/inscricao", inscricaoRoutes);

export { routes };
