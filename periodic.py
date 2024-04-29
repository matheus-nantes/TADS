import datetime
import json
import requests
import time
import sys

appID = "45abb2fa01865b31408e5ddbd2c0070d"
# localizacao = [-20.4435, -54.6478]
latitude = float(sys.argv[1])
longitude = float(sys.argv[2])
urlGet = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={appID}&units=metric"
urlPostCondicao = "http://localhost:3333/condicao"
urlPostLocalizacao = "http://localhost:3333/localizacao"

cpfPesquisador = "123.456.789-11"

while True:
    print("Obtendo dados\n")
    responseGet = requests.get(urlGet)

    if responseGet.status_code == 200:
        data = responseGet.json()

        nascerDoSol = datetime.datetime.fromtimestamp(data["sys"]["sunrise"], tz=datetime.timezone.utc).isoformat(timespec='seconds')
        porDoSol = datetime.datetime.fromtimestamp(data["sys"]["sunset"], tz=datetime.timezone.utc).isoformat(timespec='seconds')
        dataDeColeta = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')

        formatedData = {
            'latitude': data["coord"]["lat"],
            'longitude': data["coord"]["lon"],
            'tempo': data["weather"][0]["main"],
            'descricaoTempo': data["weather"][0]["description"],
            'temperatura': data["main"]["temp"],
            'sensacaoTermica': data["main"]["feels_like"],
            'temperaturaMaxima': data["main"]["temp_max"],
            'temperaturaMinima': data["main"]["temp_min"],
            'pressaoDoAr': data["main"]["pressure"],
            'umidade': data["main"]["humidity"],
            'visibilidade': data["visibility"],
            'ventoVelocidade': data["wind"]["speed"],
            'ventoDirecao': data["wind"]["deg"],
            'nuvens': data["clouds"]["all"],
            'nascerDoSol': nascerDoSol,
            'porDoSol': porDoSol,
            'dataDeColeta': dataDeColeta,
            'cpfPesquisador': cpfPesquisador
        }

        responsePostCondicao = requests.post(urlPostCondicao, json=formatedData)


        if responsePostCondicao.status_code == 201:
            print("Dados enviados com sucesso!")

        else:
            print("Falha ao enviar dados:", responsePostCondicao.json())



        formatedData = {
            'latitude': data["coord"]["lat"],
            'longitude': data["coord"]["lon"],
            'nome': data["name"]
        }
        
        responsePostLocalizacao = requests.post(urlPostLocalizacao, json=formatedData)


        if responsePostLocalizacao.status_code == 201:
            print("Localizacao salva com sucesso!")
        else:
            print("Falha ao enviar dados:", responsePostCondicao.json())


    else:
        print("Erro na requisição:", responseGet.json())

    time.sleep(300)