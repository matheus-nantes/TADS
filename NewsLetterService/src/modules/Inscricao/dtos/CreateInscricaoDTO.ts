export enum PeriodicidadeEnum {
    SEMANAL = 'semanal',
    QUINZENAL = 'quinzenal',
    MENSAL = 'mensal',
    SEMESTRAL = 'semestral',
  }


export interface CreateInscricaoDTO {
    nome: string,
    email: string,
    senha: string,
    periodicidade: PeriodicidadeEnum
  }