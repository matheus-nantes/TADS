import requests
import json
from _email_utils import enviar_email
from _dados_utils import get_dados, calcular_medias
                    
def atualizar_ultimo_recebido(usuario_id, relatorio_id):
    try:
        update_url = "http://newsletter_service:3334/inscricao/ultimoRecebido"
        update_payload = {
            "id": usuario_id,
            "ultimoRecebido": relatorio_id
        }
        update_headers = {
            "Content-Type": "application/json"
        }
        update_response = requests.put(update_url, data=json.dumps(update_payload), headers=update_headers)
        update_response.raise_for_status()
        print(f"Campo ultimoRecebido atualizado para o usuário {usuario_id} com o valor {relatorio_id}")
        return True
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
        return False
    except Exception as err:
        print(f"Other error occurred: {err}")
        return False
    
    
def procurar_atrasos():

    periodicidades = [
        "semanal",
        "quinzenal",
        "mensal",
        "semestral"
    ]

    for periodicidade in periodicidades:
        url = f"http://newsletter_service:3334/inscricao/periodicidade?periodicidade={periodicidade}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        res = requests.get(f"http://newsletter_service:3334/relatorio/last?tipo={periodicidade}")
        last = res.json()

        print(data)

        for usuario in data:
            if usuario['ultimoRecebido'] == "" or usuario['ultimoRecebido'] != last['id']:
                print(f"Enviando relatório {last['id']} para {usuario['nome']} pois estava desatualizado")
                enviou = enviar_email(usuario['email'], last['titulo'], last['conteudo'])

                if enviou:
                    atualizou = atualizar_ultimo_recebido(usuario['id'], last['id'])
                    if atualizou:
                        print(f"Agora ultimo recebido de {usuario['id']} é {last['id']}")
                    else:
                         print(f"Não foi possível atualizar o ultimo recebido de {usuario['id']} para {last['id']}")

def enviar_relatorio(tipo, titulo, conteudo):
    print(f"Começando processo de enviar relatório")
    url_relatorio = "http://newsletter_service:3334/relatorio"
    url_usuarios = f"http://newsletter_service:3334/inscricao/periodicidade?periodicidade={tipo}"

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

        response = requests.get(url_usuarios) #obtêm todos os usuários que devem receber este novo relatório
        response.raise_for_status()
        usuarios = response.json()

        for usuario in usuarios:
            email = usuario['email']
            ultimo_recebido = usuario['ultimoRecebido']

            if relatorio_id != ultimo_recebido:
                print(f"Enviar relatório {tipo} para {usuario['nome']}")
                enviou = enviar_email(email, titulo, conteudo)

                if enviou:
                    atualizou = atualizar_ultimo_recebido(usuario['id'], relatorio_id)
                    if atualizou:
                         print(f"Agora ultimo recebido de {usuario['id']} é {relatorio_id}")
                    else:
                         print(f"Não foi possível atualizar o ultimo recebido de {usuario['id']} para {relatorio_id}")

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}")

def gerar_relatorio(periodo, titulo, dias):
    dados = get_dados(dias)
    medias = calcular_medias(dados)

    if medias:
        conteudo = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }}
                h2 {{
                    color: #333;
                }}
                p {{
                    margin: 10px 0;
                }}
                .summary {{
                    border: 1px solid #ccc;
                    padding: 20px;
                    max-width: 400px;
                    margin: 0 auto;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                }}
            </style>
        </head>
        <body>
            <div class="summary">
                <h2>{titulo}</h2>
                <p>Período: Últimos {dias} dias</p>
                <p>Temperatura Média: {medias['media_temperatura']:.2f}°C</p>
                <p>Pressão Média: {medias['media_pressao']:.2f} hPa</p>
                <p>Umidade Média: {medias['media_umidade']:.2f}%</p>
            </div>
        </body>
    </html>
    """
        
        print(f"Relatório {periodo} gerado.")

        enviar_relatorio(periodo, titulo, conteudo)
