import requests
from datetime import date
import json


def getDados(dias):
    url = f"http://localhost:3333/condicao/byTime?days={dias}"
    all_data = []
    page = 1
    limit = 10

    try:
        while True:
            response = requests.get(url, params={"page": page, "limit": limit})
            response.raise_for_status()
            data = response.json()

            all_data.extend(data)

            total_count = int(response.headers.get("X-Total-Count", 0))
            total_pages = int(response.headers.get("X-Total-Pages", 1))

            print(f"Página {page} de {total_pages} recebida.")

            if page >= total_pages:
                break

            page += 1

        print("Todos os dados recebidos:", json.dumps(all_data, sort_keys=True, indent=4))
        return all_data

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}")

def calcular_medias(dias):
    dados = getDados(dias)
    
    if not dados:
        print("Nenhum dado recebido.")
        return

    total_temperatura = sum(item['temperatura'] for item in dados)
    total_pressao = sum(item['pressaoDoAr'] for item in dados)
    total_umidade = sum(item['umidade'] for item in dados)

    media_temperatura = total_temperatura / len(dados)
    media_pressao = total_pressao / len(dados)
    media_umidade = total_umidade / len(dados)

    print(f"Média da Temperatura: {media_temperatura:.2f}°C")
    print(f"Média da Pressão do Ar: {media_pressao:.2f} hPa")
    print(f"Média da Umidade do Ar: {media_umidade:.2f}%")

    medias = {
        "media_temperatura": media_temperatura,
        "media_pressao": media_pressao,
        "media_umidade": media_umidade
    }

    return medias

def enviar_email(email, tipo_relatorio):
    print(f"Enviando email para {email} com o relatório {tipo_relatorio}...")

def enviar_relatorio(tipo, titulo, conteudo):
    url_relatorio = "http://localhost:3334/relatorio"
    url_usuarios = f"http://localhost:3334/inscricao/periodicidade?periodicidade={tipo}"

    try:
        payload = {
            "tipo": tipo,
            "titulo": titulo,
            "conteudo": conteudo
        }
        headers = {
            "Content-Type": "application/json"
        }
        response = requests.post(url_relatorio, data=json.dumps(payload), headers=headers)
        response.raise_for_status()
        print(f"Relatório {tipo} enviado para o endpoint com sucesso.")
        print("Resposta do endpoint:", response.json())
        relatorio_id = response.json().get('id')

        response = requests.get(url_usuarios)
        response.raise_for_status()
        usuarios = response.json()

        for usuario in usuarios:
            email = usuario['email']
            ultimo_recebido = usuario['ultimoRecebido']

            if relatorio_id != ultimo_recebido:
                enviar_email(email, tipo)

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}")



def gerarSemanal():
    dados = getDados(7)
    medias = calcular_medias(dados)

    if medias:
        conteudo = f"temperatura média = {medias['media_temperatura']:.2f}°C\npressão média = {medias['media_pressao']:.2f} hPa\numidade média = {medias['media_umidade']:.2f}%"
        enviar_relatorio("semanal", "relatório semanal", conteudo)

def gerarQuinzenal():
    dados = getDados(15)
    medias = calcular_medias(dados)

    if medias:
        conteudo = f"temperatura média = {medias['media_temperatura']:.2f}°C\npressão média = {medias['media_pressao']:.2f} hPa\numidade média = {medias['media_umidade']:.2f}%"
        enviar_relatorio("quinzenal", "relatório quinzenal", conteudo)

def gerarMensal():
    dados = getDados(30)
    medias = calcular_medias(dados)

    if medias:
        conteudo = f"temperatura média = {medias['media_temperatura']:.2f}°C\npressão média = {medias['media_pressao']:.2f} hPa\numidade média = {medias['media_umidade']:.2f}%"
        enviar_relatorio("mensal", "relatório mensal", conteudo)

def gerarSemestral():
    dados = getDados(180)
    medias = calcular_medias(dados)

    if medias:
        conteudo = f"temperatura média = {medias['media_temperatura']:.2f}°C\npressão média = {medias['media_pressao']:.2f} hPa\numidade média = {medias['media_umidade']:.2f}%"
        enviar_relatorio("semestral", "relatório semestral", conteudo)




def fetch_condicao():
    diaDaSemana = date.today().weekday()#toda segunda envia o relatório semanal
    dia = date.today().day
    mes = date.today().month

    primeiraSegunda = False
    if (dia < 8 and dia == 0): ##toda primeira segunda do mês deve enviar o relatório mensal e quinzenal
        primeiraSegunda = True
    
    terceiraSegunda = False
    if (dia >= 15 and dia <= 21 and diaDaSemana == 0): #toda terceira segunda deve enviar o relatório quinzenal
        terceiraSegunda = True

    print("Dia:", dia)
    print("Semana: ",diaDaSemana)
    print("Primeira segunda: ", primeiraSegunda)
    print("Terceira segunda: ",terceiraSegunda)

    if(diaDaSemana == 0):
        gerarSemanal

    if(primeiraSegunda or terceiraSegunda):
        gerarQuinzenal

    if(primeiraSegunda):
        gerarMensal
    
    if(primeiraSegunda and (mes == 1 or mes == 7)): # toda primeira segunda de Janeiro e Julho emite o semestral
        gerarSemestral


    url = "http://localhost:3333/condicao"
    try:
        response = requests.get(url)
        response.raise_for_status()  
        data = response.json()      
        print("Dados recebidos:", json.dumps(data,sort_keys=True, indent=4))
        return data
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  
    except Exception as err:
        print(f"Other error occurred: {err}")  

    url = "http://localhost:3333/condicao"
    payload = {
        "latitude": -20.4435,
        "longitude": -54.6478
    }
    headers = {
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        response.raise_for_status() 
        print("Resposta recebida:", response.json())
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}") 
    

if __name__ == "__main__":
    fetch_condicao()
