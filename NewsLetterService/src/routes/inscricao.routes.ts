import { Router } from "express";
import { CreateInscricaoController } from "../modules/Inscricao/useCases/createInscricao/CreateInscricaoController";
import { GetInscricaoController } from "../modules/Inscricao/useCases/getInscricao/GetInscricaoController";
import { DesativarInscricaoController } from "../modules/Inscricao/useCases/updateInscricao/DesativarInscricaoController";
import { ValidaIncricaoUseCase } from "../modules/Inscricao/useCases/validaInscricao/ValidaInscricaoUseCase";
import { ValidaInscricaoController } from "../modules/Inscricao/useCases/validaInscricao/ValidaInscricaoController";

const createInscricao = new CreateInscricaoController();
const getInscricao = new GetInscricaoController();
const desativarInscricao = new DesativarInscricaoController();
const validaInscricao = new ValidaInscricaoController();

const inscricaoRoutes = Router();

inscricaoRoutes.post("/", createInscricao.handle);
inscricaoRoutes.get("/", getInscricao.handle);
inscricaoRoutes.put("/desativar", desativarInscricao.handle);
inscricaoRoutes.post("/login", validaInscricao.handle);


export { inscricaoRoutes };