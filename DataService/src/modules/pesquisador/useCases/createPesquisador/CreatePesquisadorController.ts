import { Request, Response } from "express";
import { CreatePesquisadorUseCase } from "./CreatePesquisadorUseCase";

export class CreatePesquisadorController {
    async handle(req: Request, res: Response) {
        const {cpf, nome, genero, instituicao, dataDeNascimento} = req.body;
        const createPesquisadorUseCase = new CreatePesquisadorUseCase;
    
        const result = await createPesquisadorUseCase.execute({cpf, nome, genero, instituicao, dataDeNascimento});
    
        return res.status(201).json(result);
    }
}