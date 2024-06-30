from datetime import date

from _relatorio_utils import procurar_atrasos, gerar_relatorio
from _dados_utils import alimentar_db

def processar():
    diaDaSemana = date.today().weekday()  # toda segunda envia o relatório semanal
    dia = date.today().day
    mes = date.today().month

    primeiraSegunda = False
    if dia < 8 and diaDaSemana == 0:  # toda primeira segunda do mês deve enviar o relatório mensal e quinzenal
        primeiraSegunda = True
    
    terceiraSegunda = False
    if dia >= 15 and dia <= 21 and diaDaSemana == 0:  # toda terceira segunda deve enviar o relatório quinzenal
        terceiraSegunda = True

    print("Dia:", dia)
    print("Semana:", diaDaSemana)
    print("Primeira segunda:", primeiraSegunda)
    print("Terceira segunda:", terceiraSegunda)

    if diaDaSemana == 0:
        gerar_relatorio("semanal", "Relatório Climático Semanal", 7)

    if primeiraSegunda or terceiraSegunda:
        gerar_relatorio("quinzenal", "Relatório Climático Quinzenal", 15)

    if primeiraSegunda:
        gerar_relatorio("mensal", "Relatório Climático Mensal", 30)
    
    if primeiraSegunda and (mes == 1 or mes == 7):  # toda primeira segunda de Janeiro e Julho emite o semestral
        gerar_relatorio("semestral", "Relatório Climático Semestral", 180)

if __name__ == "__main__":
    try:
        print("Coletando os dados da localização e inserindo no DataService")
        alimentar_db(-20.4435, -54.6478)
    except Exception as err:
        print(f"Other error occurred: {err}")
    
    print("Validando se não existem atrasos")
    procurar_atrasos()

    print("Validando situação atual para gerar relatório, se necessário, e enviar para quem foir preciso")
    #processar()
    gerar_relatorio("semanal", "Relatório Climático Semanal", 7)
    gerar_relatorio("quinzenal", "Relatório Climático Quinzenal", 15)
    gerar_relatorio("mensal", "Relatório Climático Mensal", 30)
    gerar_relatorio("semestral", "Relatório Climático Semestral", 180)
