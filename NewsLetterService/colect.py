import requests
from datetime import date
import json
def gerarSemanal():
    return 0

def gerarQuinzenal():
    return 0

def gerarMensal():
    return 0

def gerarSemestral():
    return 0

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
        response.raise_for_status()  # Verifica se a requisição foi bem-sucedida (status code 200)
        data = response.json()       # Converte a resposta para JSON
        print("Dados recebidos:", json.dumps(data,sort_keys=True, indent=4))
        return data
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Erro HTTP
    except Exception as err:
        print(f"Other error occurred: {err}")  # Outros erros

if __name__ == "__main__":
    fetch_condicao()
