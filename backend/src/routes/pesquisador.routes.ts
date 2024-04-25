import { Router } from "express";
import { CreatePesquisadorController } from "../modules/pesquisador/useCases/createPesquisador/CreatePesquisadorController";

const createPesquisadorController = new CreatePesquisadorController();

const pesquisadorRoutes = Router();

pesquisadorRoutes.post("/", createPesquisadorController.handle);

export { pesquisadorRoutes };