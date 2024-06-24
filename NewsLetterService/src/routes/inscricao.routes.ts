import { Router } from "express";
import { CreateInscricaoController } from "../modules/Inscricao/useCases/createInscricao/CreateInscricaoController";
import { GetInscricaoController } from "../modules/Inscricao/useCases/getInscricao/GetInscricaoController";
import { DesativarInscricaoController } from "../modules/Inscricao/useCases/updateInscricao/DesativarInscricaoController";
import { ValidaInscricaoController } from "../modules/Inscricao/useCases/validaInscricao/ValidaInscricaoController";
import { GetInscricaoByTypeController } from "../modules/Inscricao/useCases/getInscricao/GetInscricaoByTypeController";

const createInscricao = new CreateInscricaoController();
const getInscricao = new GetInscricaoController();
const desativarInscricao = new DesativarInscricaoController();
const validaInscricao = new ValidaInscricaoController();
const getInscricaoByTypeController = new GetInscricaoByTypeController();

const inscricaoRoutes = Router();

inscricaoRoutes.post("/", createInscricao.handle);
inscricaoRoutes.get("/", getInscricao.handle);
inscricaoRoutes.get("/periodicidade", getInscricaoByTypeController.handle);
inscricaoRoutes.put("/desativar", desativarInscricao.handle);
inscricaoRoutes.post("/login", validaInscricao.handle);


export { inscricaoRoutes };