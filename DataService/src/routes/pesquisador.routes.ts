import { Router } from "express";
import { CreatePesquisadorController } from "../modules/pesquisador/useCases/createPesquisador/CreatePesquisadorController";
import { GetPesquisadoresController } from "../modules/pesquisador/useCases/getPesquisadores/GetPesquisadorController";

const createPesquisadorController = new CreatePesquisadorController();
const getPesquisadores = new GetPesquisadoresController();

const pesquisadorRoutes = Router();

pesquisadorRoutes.post("/", createPesquisadorController.handle);
pesquisadorRoutes.get("/", getPesquisadores.handle)

export { pesquisadorRoutes };