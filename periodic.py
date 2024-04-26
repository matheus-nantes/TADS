import datetime
import json
import requests

appID = "45abb2fa01865b31408e5ddbd2c0070d"
localizacao = [-20.4435, -54.6478]
urlGet = f"https://api.openweathermap.org/data/2.5/weather?lat={localizacao[0]}&lon={localizacao[1]}&appid={appID}"
urlPost = "http://localhost:3333/condicao"
cpfPesquisador = "123.456.789-11"

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

    responsePost = requests.post(urlPost, json=formatedData)

    if responsePost.status_code == 201:
        try:
            print("Dados enviados com sucesso!")
        except json.JSONDecodeError:
            print("Resposta não é JSON ou está vazia.")
    else:
        print("Falha ao enviar dados:", responsePost.json())
else:
    print("Erro na requisição:", responseGet.json())
