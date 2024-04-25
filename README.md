# TADS
>Repositório criado para desenvolvimento do exercício prático para a disciplina de TADS/2024.1 ministrada pelo professors Dr. Hudson Silva Borges

>Para o banco de dados será utilizado o ORM Prisma.js

>Para executar o sistema corretamente, primeiramente voce deve fazer o download das dependências do projeto com:
````c
yarn add
````

>Com isso, o sistema conseguirá ser executado corretamente.

Para visualizar o banco de dados, basta encaminhar o terminal para dentro da pasta backend, com o comando:
````c
    cd backend
````

>E então executar:
````c
    yarn prisma studio
````

>Com isso será aberta a interface web que o prisma disponibiliza para visualização do banco de dados

>Algumas regras definidas:
+Dados só podem ser inseridos com supervisão de pesuisador, pois deve ser possível rastrear quem autorizou a inserção dos dados

+As temperaturas sempre serão em °C

+Direção do vento é salva em graus, sendo possível obter a direção abstraindo pelo grau.

+No atributo "nuvens" de "CondicaoClimatica" é salvo a porcentagem de nuvens cobrindo o céu naquele instante e local
