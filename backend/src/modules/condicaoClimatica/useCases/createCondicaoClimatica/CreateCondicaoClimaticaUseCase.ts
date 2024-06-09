import { CondicaoClimatica } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateCondicaoClimaticaDTO } from "../../dtos/CreateCondicaoClimaticaDTO";

export class CreateCondicaoClimaticaUseCase {
    async execute({latitude, longitude} : CreateCondicaoClimaticaDTO) : Promise<CondicaoClimatica> {
        const appID = "45abb2fa01865b31408e5ddbd2c0070d";
        
        const urlGet = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appID}&units=metric`;
        const dadosClimaticos = await fetch(urlGet);

        if (dadosClimaticos.ok) {
            const data:any = await dadosClimaticos.json();

            const nascerDoSol = new Date(data.sys.sunrise * 1000).toISOString();
            const porDoSol = new Date(data.sys.sunset * 1000).toISOString();
            const dataDeColeta = new Date().toISOString();

           const condicao = await prisma.condicaoClimatica.create({
                data:{
                    latitude: data.coord.lat,
                    longitude: data.coord.lon,
                    local: `${data.name}-${data.sys.country}`,
                    tempo: data.weather[0].main,
                    descricaoTempo: data.weather[0].description,
                    temperatura: data.main.temp,
                    sensacaoTermica: data.main.feels_like,
                    temperaturaMaxima: data.main.temp_max,
                    temperaturaMinima: data.main.temp_min,
                    pressaoDoAr: data.main.pressure,
                    umidade: data.main.humidity,
                    visibilidade: data.visibility,
                    ventoVelocidade: data.wind.speed,
                    ventoDirecao: data.wind.deg,
                    nuvens: data.clouds.all,
                    nascerDoSol: nascerDoSol,
                    porDoSol: porDoSol,
                    dataDeColeta: dataDeColeta,
                    cpfPesquisador: "123.456.789-11"//futuramente, isso pode ser modificado para uqe com o login do persuisador, esse campo também virá por meio do body do post.
                }
            });
            return condicao;
        } else {
            throw new AppError(`Erro na requisição: ${dadosClimaticos.status}`);
        }
    
    }
}