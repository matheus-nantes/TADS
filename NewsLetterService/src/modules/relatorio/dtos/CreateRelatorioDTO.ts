export enum PeriodicidadeEnum {
    SEMANAL = 'semanal',
    QUINZENAL = 'quinzenal',
    MENSAL = 'mensal',
    SEMESTRAL = 'semestral',
  }


export interface CreateRelatorioDTO {
    tipo: PeriodicidadeEnum,
    titulo: string,
    conteudo: string
  }