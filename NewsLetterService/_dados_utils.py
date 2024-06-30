import requests
import json

def alimentar_db(latitude, longitude):
    url = "http://data_service:3333/condicao"
    payload = {
        "latitude": latitude,
        "longitude": longitude
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, data=json.dumps(payload), headers=headers)
        response.raise_for_status()
        print("Dados enviados com sucesso para o banco de dados.")
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}")
        

def get_dados(dias):
    url = f"http://data_service:3333/condicao/byTime?days={dias}"
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

        #print("Todos os dados recebidos:", json.dumps(all_data, sort_keys=True, indent=4))
        return all_data

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"Other error occurred: {err}")

def calcular_medias(dados):
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
