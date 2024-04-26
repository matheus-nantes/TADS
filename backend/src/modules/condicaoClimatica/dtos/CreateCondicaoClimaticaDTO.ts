export interface CreateCondicaoClimaticaDTO {
  latitude: number;
  longitude : number;
  tempo: string;
  descricaoTempo: string;
  temperatura : number;
  sensacaoTermica : number;
  temperaturaMaxima : number;
  temperaturaMinima : number;
  pressaoDoAr : number;
  umidade : number;
  visibilidade : number;
  ventoVelocidade : number;
  ventoDirecao : number;
  nuvens : number;
  nascerDoSol: Date;
  porDoSol: Date;
  dataDeColeta: Date;

  cpfPesquisador: string;
}