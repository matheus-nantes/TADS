import { Router } from "express";
import { CreateLocalizacaoController } from "../modules/localizacao/useCases/createLocalizacao/CreateLocalizacaoController";

const createLocalizacaoController = new CreateLocalizacaoController

const localizacaoRoutes = Router();

localizacaoRoutes.post("/", createLocalizacaoController.handle);

export { localizacaoRoutes };