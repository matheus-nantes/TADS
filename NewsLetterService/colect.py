import requests

def fetch_condicao():
    url = "http://localhost:3333/condicao"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Verifica se a requisição foi bem-sucedida (status code 200)
        data = response.json()       # Converte a resposta para JSON
        print("Dados recebidos:", data)
        return data
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Erro HTTP
    except Exception as err:
        print(f"Other error occurred: {err}")  # Outros erros

if __name__ == "__main__":
    fetch_condicao()
